const jwt = require('jsonwebtoken');
const config = require('../config/env');

const USERSECRET_KEY = config.userjwtkey; 
const USERCOOKIE_NAME = config.userAuthToken;
const ADMINCOOKIE_NAME = config.adminAuthToken;
const ADMINSECRET_KEY = config.adminjwtkey; 

// Middleware for protected routes
const userAuth = (req, res, next) => {
    const authCookie = req.cookies[USERCOOKIE_NAME];
    
    if (!authCookie) {
        return res.status(401).json({ login: false, message: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(authCookie, USERSECRET_KEY);
        req.user = decoded;  // Pass the decoded token data to the next middleware
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Unauthorized: Token expired' });
        }
        console.log('Token verification failed:', err.message);
        return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
};

const adminAuth = (req, res, next) => {
    const authCookie = req.cookies[ADMINCOOKIE_NAME];
    
    if (!authCookie) {
        return res.status(401).json({ login: false, message: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(authCookie, ADMINSECRET_KEY);
        req.user = decoded;  // Pass the decoded token data to the next middleware
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Unauthorized: Token expired' });
        }
        console.log('Token verification failed:', err.message);
        return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
};







module.exports = {userAuth,adminAuth};