const express = require('express');
const router = express.Router();

const { getAnalytics, getAnalyticsByTopic } = require('../controlllers/analytics');

router.get('/:shortUrl', getAnalytics);
router.get('/topic/:topic', getAnalyticsByTopic);

module.exports = router;