module.exports = (req, res, next) => {
  if (res.locals.id) {
    return res.redirect("/");
  }
  next();
};
