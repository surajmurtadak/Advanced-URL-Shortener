const express = require('express');
const router = express.Router();

const { getAnalytics, getAnalyticsByTopic, getOverallAnalytics } = require('../controlllers/analytics');

router.get('/overall', getOverallAnalytics);
router.get('/topic/:topic', getAnalyticsByTopic);
router.get('/:shortUrl', getAnalytics);

module.exports = router;