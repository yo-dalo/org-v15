const express = require('express');

const db = require("../db/Conn");

const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const config = require('../config/env');
const router = express.Router();

const ADMINSECRET_KEY = config.adminjwtkey; // R


  
  router.post('/admin/login/v2', (req, res) => {
  const { adminPhone, adminOtp } = req.body;
  
  if (!adminPhone || !adminOtp) {
    return res.status(400).json({ error: 'adminPhone and adminOtp are required' });
  }
  
  
  
  const fetchSql = `SELECT o.Otp, o.Expiry, a.adminId, a.adminUserName, a.adminPhone
  from adminOtp o Join admin a on 
  a.adminPhone=o.Phone_number 
  where o.Phone_number =?`;
  
  db.query(fetchSql, [adminPhone], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'This Number no exist ' });
    }

    const record = results[0];
    
    // Check adminOtp expiry
    if (!record.Otp) {
      return res.status(400).json({ error: 'adminOtp has Not exist' });
    }
    if (new Date() > record.Expiry) {
      return res.status(400).json({ error: 'adminOtp has expired' });
    }

    // Validate adminOtp
    if (record.Otp !== adminOtp) {
      return res.status(400).json({ error: 'Invalid adminOtp' });
    }

    // Generate JWT token
    const token = jwt.sign({ adminPhone, adminOtp, UserId: record.UserId, name: record.UserName }, ADMINSECRET_KEY, { expiresIn: '1d' });
    
    res.cookie(config.adminAuthToken, token, {
      path: '/',
      httpOnly: false, // Keep it secure from JavaScript
      secure: false, // Only enable secure in production
      sameSite: 'Lax', // SameSite None for production, Lax for development
    }).json({ message: 'User login successfully', record });
  });
});






module.exports = router;