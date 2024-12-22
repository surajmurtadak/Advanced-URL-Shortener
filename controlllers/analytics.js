const URL = require('../models/url');

async function getAnalytics(req, res) {
  const { shortUrl } = req.params;
  const url = await URL.findOne({ shortUrl });
  if (!url) {
    return res.status(400).json({ error: 'URL not found' });
  }
  return res.json({
    totalClick: url.visitHistory.length,
    analytics: url.visitHistory
  });
}

module.exports = {
  getAnalytics,
}