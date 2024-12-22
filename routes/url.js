const express = require('express');
const router = express.Router();

const { urlShortenerHandler, redirect } = require('../controlllers/url');

router.post('/', urlShortenerHandler);
router.get('/:shortUrl', redirect);

module.exports = router;