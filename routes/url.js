const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');

const { urlShortenerHandler, redirect } = require('../controlllers/url');

router.post('/', isAuthenticated, urlShortenerHandler);
router.get('/:shortUrl', redirect);

module.exports = router;