exports.home = function (req, res, next) {
  if (req.session.username) {
    res.locals.username = req.session.username;
    res.locals.profile_image = req.session.profile_image;
    res.locals.rank = req.session.rank;
    res.locals.isLogin = req.session.isLogin;
  } else {
    res.locals.username = "Login Here";
    res.locals.profile_image = "https://picsum.photos/50/50";
    res.locals.rank = "user";
    res.locals.isLogin = false;
  }

  next();
};
