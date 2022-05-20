const midtransClient = require("midtrans-client");
const orders = require("../model/sequelize/orders")();
const ordered_items = require("../model/sequelize/ordered_items")();
const Items = require("../model/sequelize/items")();
let core = new midtransClient.CoreApi({
  isProduction: false, //true (accept real transaction)
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

function bank_transfer(res, bank_name, price, item_id, username, address1, address2) {
  let parameter = {
    payment_type: "bank_transfer",
    transaction_details: {
      gross_amount: price,
      order_id: Date.now() + "_TES-ORDER",
    },
    bank_transfer: {
      bank: bank_name,
    },
  };
  try {
    core.charge(parameter).then(async (chargeResponse) => {
      console.log("Actions: " + JSON.stringify(chargeResponse));
      const items = await Items.findOne({ where: { item_id: item_id } });
      await orders.create({
        order_id: chargeResponse.order_id,
        username: username,
        merchant_id: chargeResponse.merchant_id,
        transaction_id: chargeResponse.transaction_id,
        payment_type: chargeResponse.payment_type,
        transaction_time: chargeResponse.transaction_time,
        transaction_status: chargeResponse.transaction_status,
        gross_amount: chargeResponse.gross_amount,
        currency: chargeResponse.currency,
        platform_name: chargeResponse.va_numbers[0].bank,
        va_number: chargeResponse.va_numbers[0].va_number,
        address1: address1,
        address2: address2,
      });
      await ordered_items.create({
        order_id: chargeResponse.order_id,
        item_id: items.item_id,
        amount: 1,
      });
      res.redirect("/thankyou/1/" + chargeResponse.order_id);
    });
  } catch (error) {
    console.log("Status: " + chargeResponse.status_code);
    res.redirect("back");
  }
}

function emoney_transfer(res, emoney_name, gross_amount, item_id, username) {
  let parameter = {
    payment_type: emoney_name,
    transaction_details: {
      gross_amount: gross_amount,
      order_id: Date.now() + "_TES-ORDER",
    },
  };
  try {
    core.charge(parameter).then((chargeResponse) => {
      //console.log("Actions: " + JSON.stringify(chargeResponse.actions[2].url));
      res.redirect(chargeResponse.actions[1].url);
    });
  } catch (error) {
    console.log("Status: " + chargeResponse.status_code);
    res.redirect("back");
  }
}
exports.payment_gateaway = async function (req, res) {
  if (!req.session.username) return res.redirect("/login");
  const check_orders = await orders.findAll({
    where: { username: req.session.username, transaction_status: "pending" },
  });
  if (check_orders.length > 1) return res.send("Maximum Order Limit");
  const items = await Items.findOne({ where: { item_id: req.body.item_id } });
  const price = items.price * 14565 + 5000;
  const item_id = req.body.item_id;
  const username = req.session.username || "Unknown";
  const address1 = req.body.addr1;
  const address2 = req.body.addr2;
  if (req.params.payment_type == "bankTransfer") {
    bank_transfer(res, req.body.bank_name, price, item_id, username, address1, address2);
  }
  if (req.params.payment_type == "eMoney") {
    emoney_transfer(res, req.body.eMoneyName, price, item_id, username);
  }
};

exports.payment_detail_bank_transfer = async function (req, res) {
  if (!req.session.username) {
    return res.redirect("/login");
  }
  try {
    const result = await orders.findOne({ where: { order_id: req.params.order_id } });
    if (result.username != req.session.username) return res.redirect("/");
    const format = new Intl.NumberFormat("id", { style: "currency", currency: "IDR" });
    res.render("bank-pending", { response: result, format });
  } catch (error) {
    console.log("error");
  }
};

exports.payment_detail_emoney = async function (req, res) {
  res.send("OK");
};
exports.notificationHandling = async function (req, res) {
  console.log("Wait");
  try {
    const statusResponse = await core.transaction.notification();
    let orderId = statusResponse.order_id;
    let transactionStatus = statusResponse.transaction_status;
    let fraudStatus = statusResponse.fraud_status;
    console.log(
      `Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`
    );
  } catch (err) {
    res.send(err.data);
  }
};

exports.notificationHandler = async function (req, res) {
  const order_id = req.body.order_id;
  const status = req.body.transaction_status;
  console.log(order_id + " status updated to: " + status);
  orders.update({ transaction_status: status }, { where: { order_id: order_id } });
};
