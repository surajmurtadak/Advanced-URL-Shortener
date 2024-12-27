function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/'); // Redirect to home if not authenticated
}

module.exports = {
  isAuthenticated
};