const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/failed" }),
  (req, res) => {
    res.redirect("/profile");
  }
);

router.get('/failed', (req, res) => {
  res.send('Authentication Failed Please try again. <br> <a href="/auth/google">Login with Google</a>');
});

router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

module.exports = router;