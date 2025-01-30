const express = require('express');

const db = require("../../db/Conn");

const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const config = require('../../config/env');
const router = express.Router();

const SECRET_KEY = config.userjwtkey; // R



    
  router.post('/login/', (req, res) => {
  const { phone, otp } = req.body;
  
  if (!phone || !otp) {
    return res.status(400).json({ error: 'Phone and OTP are required' });
  }
  
  const fetchSql = `
    SELECT Otp, Expiry, Users.UserId, Users.UserName ,Users.Phone
    FROM Otp 
    JOIN Users ON Otp.Phone_number = Users.Phone 
    WHERE Otp.Phone_number = ?`;
  
  db.query(fetchSql, [phone], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'This Number no exist ' });
    }

    const record = results[0];
    
    
    
    // Check OTP expiry
    if (new Date() > record.Expiry) {
      return res.status(400).json({ error: 'OTP has expired' });
    }

    // Validate OTP
    if (record.Otp !== otp) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    // Generate JWT token
    const token = jwt.sign({ phone, otp, UserId: record.UserId, name:record.UserName }, SECRET_KEY, { expiresIn: '3h' });
    
    res.cookie('authToken', token, {
      path: '/',
      httpOnly: false, // Keep it secure from JavaScript
      secure: false, // Only enable secure in production
      sameSite: 'Lax', // SameSite None for production, Lax for development
    }).json({ message: 'User login successfully', results });
  });
});
  router.post('/login/v2', (req, res) => {
  const { phone, otp } = req.body;
  
  if (!phone || !otp) {
    return res.status(400).json({ error: 'Phone and OTP are required' });
  }
  
  const fetchSql = `SELECT Otp, Expiry, Users.UserId, Users.UserName, Users.Phone, ud.DetailsId FROM Users LEFT JOIN Otp ON Otp.Phone_number = Users.Phone LEFT JOIN UserDetails ud ON ud.UserId = Users.UserId WHERE Users.Phone = ?;`;
  
  db.query(fetchSql, [phone], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'This Number no exist ' });
    }

    const record = results[0];
    
    // Check OTP expiry
    if (!record.Otp) {
      return res.status(400).json({ error: 'OTP has Not exist' });
    }
    if (new Date() > record.Expiry) {
      return res.status(400).json({ error: 'OTP has expired' });
    }

    // Validate OTP
    if (record.Otp !== otp) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    // Generate JWT token
    const token = jwt.sign({ phone, otp, UserId: record.UserId, name: record.UserName }, SECRET_KEY, { expiresIn: '1d' });
    
    res.cookie(config.userAuthToken, token, {
      path: '/',
      httpOnly: false, // Keep it secure from JavaScript
      secure: false, // Only enable secure in production
      sameSite: 'Lax', // SameSite None for production, Lax for development
    }).json({ message: 'User login successfully', record });
  });
});






module.exports = router;