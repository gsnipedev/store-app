const Comments = require("../model/sequelize/comments")();

exports.comment_post = async function (req, res) {
  if (!req.session.username) {
    return res.redirect("/login");
  }
  await Comments.create({
    username: req.session.username,
    comment_text: req.body.comment_text,
    item_id: req.params.item_id,
  });
  res.redirect("back");
};
