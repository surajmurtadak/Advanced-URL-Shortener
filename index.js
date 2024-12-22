const express = require('express');
const { connectToMongoDB } = require('./connection');
const urlRouter = require('./routes/url');
const analyticsRouter = require('./routes/analytics');

const URL = require('./models/url');  

const app = express();
app.use(express.json());
require('dotenv').config();

const PORT = process.env.PORT;
app.use('/api/shorten', urlRouter);
app.use('/api/analytics', analyticsRouter);


connectToMongoDB(process.env.MONGODB_URL)
.then(() => console.log('Connected to MongoDB'))

app.get('/', (req,res) => {
  res.json({msg: 'Hello World'});
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});