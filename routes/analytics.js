const express = require('express');
const router = express.Router();

const { getAnalytics } = require('../controlllers/analytics');

router.get('/:shortUrl', getAnalytics);

module.exports = router;