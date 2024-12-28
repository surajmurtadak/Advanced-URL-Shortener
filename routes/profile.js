const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');

router.get('/profile',isAuthenticated, (req, res) => {
  res.send(`
    Welcome ${req.user.name} <br>
     <form action="/api/shorten/" method="post">
     <input type="text" name="longUrl" placeholder="Enter Long URL" required>  
     <input type="text" name="customAlias" placeholder="Enter Custom Alias">
     <input type="text" name="topic" placeholder="Enter Topic">
     <button type="submit"> Create Short URL </button>   
     `);
});

module.exports = router;