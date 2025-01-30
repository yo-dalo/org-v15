const express = require('express');
const cors = require('cors');

const axios = require('axios');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser =require('cookie-parser');
//const routes = require('./routes/index');
const user_routes = require('./routes/User');
const user_ragistration = require('./routes/user/ragistration');
const user_login = require('./routes/user/login');
const user = require('./routes/user/user');
const user_plans = require('./routes/Plans/show_plans');
const uploadWaddingCard = require('./routes/waddingCard/uploadWaddingCard');
const add_user_detail = require('./routes/user_detail/add_user_detail');
const Comment = require('./routes/Comment');
//const auth = require('./Utility/auth');
const payment = require('./Utility/payment');
const upload = require('./Utility/upload');
/// admin
const adminRagistration = require('./admin/ragistration');
const adminLogin = require('./admin/Login');
const adminUser = require('./admin/User');
const adminPlan = require('./admin/Plan');
const adminPoster = require('./admin/Poster');
const adminSiteinfo = require('./admin/Siteinfo');





const app = express();

// Middleware
//app.use(cors());
const allowedOrigins = ['http://localhost:5173', 'http://localhost:7700','http://localhost:3000/'];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Route
//app.use('/', routes);
app.use('/api',user_routes);
app.use('/api',user_ragistration);
app.use('/api',add_user_detail);
app.use('/api',user_login);
app.use('/api',user);
app.use('/api',Comment);
//app.use(auth);
app.use('/api',user_plans);
app.use('/api',payment);
app.use('/api',upload);
app.use('/api',uploadWaddingCard);
///admin
app.use('/api',adminRagistration);
app.use('/api',adminLogin);
app.use('/api',adminPlan);
app.use('/api',adminPoster);
app.use('/api',adminSiteinfo);
app.use('/api',adminUser);








module.exports = app;