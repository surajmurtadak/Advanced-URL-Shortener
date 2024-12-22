const mongoose = require('mongoose');

async function connectToMongoDB(url) {
  try {
    await mongoose.connect(url, {});
  }
  catch (error) {
    console.log('Error connecting to MongoDB');
    console.error(error);
  }
}

module.exports = {
  connectToMongoDB,
}