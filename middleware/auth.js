function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/auth/failed');
}

module.exports = {
  isAuthenticated
};