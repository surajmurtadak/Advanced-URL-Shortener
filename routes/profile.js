const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');

router.get('/profile',isAuthenticated, (req, res) => {
  res.send(`Welcome ${req.user.name}`);
});

module.exports = router;