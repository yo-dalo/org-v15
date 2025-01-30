require('dotenv').config();

const config = {
    port: process.env.PORT,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    userjwtkey:process.env.USERJWTSECRET_KEY,
    adminjwtkey:process.env.ADMINJWTSECRET_KEY,
    cashfreeXClientId:process.env.cashfreeXClientId,
    cashfreeXClientSecret:process.env.cashfreeXClientSecret,
    fasttosmsotp:process.env.FAST2SMSOTP,
    userAuthToken:process.env.USERAUTHCOOIANAME,
    adminAuthToken:process.env.ADMINAUTHCOOIANAME,
};

module.exports = config;