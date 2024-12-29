const shortid = require('shortid');
const URL = require('../models/url');
const { getUserDetails } = require('../services/urlServices');

async function urlShortenerHandler(req, res) {
  try {
    let { longUrl, customAlias, topic } = req.body;
    topic = topic?.toLowerCase();
    console.log(req.user?._id);
    if (!longUrl) {
      return res.status(400).json({ error: 'longUrl is required' });
    }
    if (customAlias) {
      const existedUrl = await URL.findOne({ customAlias });
      if (existedUrl) {
        return res.status(400).json({ error: 'customAlias is already taken' });
      }
    }
    const shortUrl = (process.env.BASE_URL || '<Base_URL>' ) + (customAlias || shortid());
    const newUrl = await URL.create({
      shortUrl,
      longUrl,
      topic,
      userId: req.user?._id,
      visitHistory: []
    });
  
    return res.json({
      shortUrl: newUrl.shortUrl,
      createdAt: newUrl.createdAt,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function redirect (req, res) {
  let { shortUrl } = req.params;
  shortUrl = process.env.BASE_URL + shortUrl;
  const { osDetail, deviceType, userAgent, IP } = getUserDetails(req);
  console.log("OS: ", osDetail, "IP: ", IP, "Device Type: ", deviceType , "User Agent: ", userAgent);
  const newUrl = await URL.findOneAndUpdate({ shortUrl}, { $push: { visitHistory: { timestamp: Date.now(), OSDetail: osDetail, IP: IP, DeviceType: deviceType , UserAgent: userAgent } } });
  if (!newUrl) {
    return res.status(400).json({ error: 'URL not found'});
  }
  res.redirect(newUrl.longUrl);
}

module.exports = {
  urlShortenerHandler,
  redirect,
}