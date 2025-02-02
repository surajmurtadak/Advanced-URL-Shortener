
const getUserDetails = (req) => {
  const userAgent = req.headers['user-agent'];
  const IPs = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const IP = IPs?.split(',')[0];
    const osMatch = userAgent.match(/\(([^)]+)\)/);
    const osDetail = osMatch ? osMatch[1] : 'Unknown';

    // Device Type Detection (simple heuristic)
    const isMobile = /Mobile|Android/i.test(userAgent);
    const isTablet = /Tablet|iPad/i.test(userAgent);
    const deviceType = isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop';

    return {
      osDetail,
      deviceType,
      userAgent,
      IP,
    };
};

module.exports = {
  getUserDetails,
}