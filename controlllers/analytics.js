const URL = require('../models/url');
const { redirect } = require('./url');

function clickByDateData(analytics) {
  const result = analytics.reduce((acc, curr) => {
      const date = curr.timestamp.toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
  }, {});

  return Object.entries(result).map(([date, count]) => ({ date, count }));
}

function osTypeData(analytics) {
  if (!analytics || !Array.isArray(analytics)) {
    return [];
  }

  const osTypeData = {};

  analytics.forEach((visit) => {
    const osName = visit.OSDetail || "Unknown OS";
    const userIP = visit.IP || "Unknown IP";

    if (!osTypeData[osName]) {
      osTypeData[osName] = {
        osName,
        uniqueClicks: 0,
        uniqueUsers: new Set(),
      };
    }
    osTypeData[osName].uniqueClicks += 1;
    osTypeData[osName].uniqueUsers.add(userIP);
  });

  return Object.values(osTypeData).map((entry) => ({
    osName: entry.osName,
    uniqueClicks: entry.uniqueClicks,
    uniqueUsers: entry.uniqueUsers.size,
  }));
}

function deviceTypeData(analytics) {
  if (!analytics || !Array.isArray(analytics)) {
    return [];
  }

  const deviceTypeData = {};

  analytics.forEach((visit) => {
    const deviceType = visit.DeviceType || "Unknown Device";
    const userIP = visit.IP || "Unknown IP";

    if (!deviceTypeData[deviceType]) {
      deviceTypeData[deviceType] = {
        deviceType,
        uniqueClicks: 0,
        uniqueUsers: new Set(),
      };
    }
    deviceTypeData[deviceType].uniqueClicks += 1;
    deviceTypeData[deviceType].uniqueUsers.add(userIP);
  });

  return Object.values(deviceTypeData).map((entry) => ({
    deviceType: entry.deviceType,
    uniqueClicks: entry.uniqueClicks,
    uniqueUsers: entry.uniqueUsers.size,
  }));
}

async function getAnalytics(req, res) {
  const { shortUrl } = req.params;
  const userId = req.user?._id;
  const url = await URL.findOne({ shortUrl, userId });
  if (!url) {
    return res.status(400).json({ error: 'URL not found!' });
  }
  let analytics = url.visitHistory;
  console.log("Analytics by date: ", clickByDateData(analytics));
  const clicksByDate = clickByDateData(analytics);
  const uniqueUsers = new Set(analytics.map(a => a.IP)).size;
  const osType = osTypeData(analytics);
  const deviceType = deviceTypeData(analytics);
  return res.json({
    totalClick: analytics.length,
    uniqueUsers,
    clicksByDate,
    osType,
    deviceType,

  });
}

async function getAnalyticsByTopic(req, res) {
  const { topic } = req.params;
  const userId = req.user?._id;
  const urls = await URL.find({ topic, userId });
  if (!urls) {
    return res.status(400).json({ error: 'URL not found, Please check once topics added or not' });
  }
  let analytics = urls.map(url => url.visitHistory).flat();
  const totalClicks = analytics.length;
  const clicksByDate = clickByDateData(analytics);
  const uniqueUsers = new Set(analytics.map(a => a.IP)).size;
  const urlsData  = urls.map((url) => {
    return {
      shortUrl: url.shortUrl,
      totalClicks: url.visitHistory.length,
      uniqueUsers: new Set(url.visitHistory.map(a => a.IP)).size,
    }
  });

  return res.json({
    totalClicks,
    uniqueUsers,
    clicksByDate,
    urlsData,
  })
}

async function getOverallAnalytics(req, res) {
  const userId = req.user?._id;
  const urls = await URL.find({ userId });
  console.log(' :: ',urls);
  if (!urls) {
    return res.status(400).json({error: "No0 URL found.."});
  }
  const totalUrls = urls.length;
  const analytics = urls.map(url => url.visitHistory).flat();
  const totalClicks = analytics.length;
  const uniqueUsers = new Set(analytics.map(a => a.IP)).size;
  const clicksByDate = clickByDateData(analytics);
  const osType = osTypeData(analytics);
  const deviceType = deviceTypeData(analytics);

  return res.json({
    totalUrls,
    totalClicks,
    uniqueUsers,
    clicksByDate,
    osType,
    deviceType,
  })
}

module.exports = {
  getAnalytics,
  getAnalyticsByTopic,
  getOverallAnalytics,
}