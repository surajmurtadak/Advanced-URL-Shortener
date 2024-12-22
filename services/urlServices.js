const os = require('os');

const getPrimaryMACAddress = () => {
  const networkInterfaces = os.networkInterfaces();
  for (const interfaceName in networkInterfaces) {
      for (const details of networkInterfaces[interfaceName]) {
          if (!details.internal && details.mac !== '00:00:00:00:00:00') {
              return details.mac;
          }
      }
  }
  return null;
}

const getOS = () => {

  const osType = os.type();
  const osPlatform = os.platform();
  const osRelease = os.release();

  if (osType === 'Linux' && osRelease.includes('android')) {
    return 'Android';
  } else if (osType === 'Darwin' && osRelease.includes('iOS')) {
    return 'iOS';
  } else if (osType === 'Darwin') {
    return 'macOS';
  } else if (osType === 'Windows_NT') {
    return 'Windows';
  } else {
    return osPlatform;
  }
}

module.exports = {
  getPrimaryMACAddress,
  getOS,
}