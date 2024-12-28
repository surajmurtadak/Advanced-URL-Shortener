const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');

const { getAnalytics, getAnalyticsByTopic, getOverallAnalytics } = require('../controlllers/analytics');

router.get('/overall', isAuthenticated, getOverallAnalytics);
router.get('/topic/:topic', isAuthenticated, getAnalyticsByTopic);
router.get('/:shortUrl', isAuthenticated, getAnalytics);

module.exports = router;