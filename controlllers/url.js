const shortid = require('shortid');
const URL = require('../models/url');
const { getPrimaryMACAddress, getOS } = require('../services/urlServices');

async function urlShortenerHandler(req, res) {
  try {
    const { longUrl, customAlias } = req.body;
    if (!longUrl) {
      return res.status(400).json({ error: 'longUrl is required' });
    }
    if (customAlias) {
      const existedUrl = await URL.findOne({ customAlias });
      if (existedUrl) {
        return res.status(400).json({ error: 'customAlias is already taken' });
      }
    }
    console.log('IP: ', getPrimaryMACAddress(), 'OS: ', getOS());
    const shortUrl = customAlias || shortid();
    const newUrl = await URL.create({
      shortUrl,
      longUrl,
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
  const { shortUrl} = req.params;
  const newUrl = await URL.findOneAndUpdate({ shortUrl}, { $push: { visitHistory: { timestamps: Date.now(), MACAddress: getPrimaryMACAddress(), osName: getOS() } } });
  if (!newUrl) {
    return res.status(400).json({ error: 'URL not found'});
  }
  res.redirect(newUrl.longUrl);
}

module.exports = {
  urlShortenerHandler,
  redirect,
}