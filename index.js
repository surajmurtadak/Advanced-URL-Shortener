const express = require('express');
const cors = require('cors');
const session = require('express-session');
const { connectToMongoDB } = require('./connection');
const urlRouter = require('./routes/url');
const analyticsRouter = require('./routes/analytics');
const passport = require('./services/passport');
const authRoutes = require('./routes/auth');
const profile = require('./routes/profile');
const swaggerSetup = require('./swagger');
require('dotenv').config();

const URL = require('./models/url');  

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: process.env.SECRET_KEY, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT;
app.use('/api/shorten', urlRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/auth', authRoutes);
app.use('/', profile);

connectToMongoDB(process.env.MONGODB_URL)
.then(() => console.log('Connected to MongoDB'))

app.get('/', (req,res) => {
  res.send("Hello, Please login click below.<br> <a href='/auth/google'>Login with Google</a>");
});

swaggerSetup(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});