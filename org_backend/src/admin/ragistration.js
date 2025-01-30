//INSERT INTO `admin` (`adminId`, `adminadminUserName`, `adminPassword`, `adminDate`) VALUES ('2', 'Adams ', 'Shdj', current_timestamp());
const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const db = require("../db/Conn");
const axios = require('axios');
const Joi = require('joi');
const moment = require('moment');
const config = require('../config/env');

// Send OTP via Fast2SMS
async function sendOtpViaSMS(phone, otp) {
  const API_KEY = config.FAST2SMSOTP; // Replace with your Fast2SMS API key
  const message = `Your OTP for logging in to LLY account is   ${otp}.Valid for the next 5 min.`;

  try {
    const response = await axios.post('https://www.fast2sms.com/dev/bulkV2', {
      route: 'q', // Transactional route
      message: message,
      language: 'english',
      numbers: phone,
    }, {
      headers: {
        'authorization': API_KEY,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error sending OTP:', error.message);
    return null;
  }
}

router.post('/otp', (req, res) => {
  const { phone } = req.body;
  const adminId = 11;

  // Validate phone number
  if (!phone || !/^\d{10}$/.test(phone)) {
    return res.status(400).json({ error: 'Invalid phone number' });
  }

  // Generate a random 6-digit OTP
  const otp = crypto.randomInt(100000, 999999);
  const expiry = new Date(Date.now() + 10 * 60 * 100); // Expire after 1 minute

  // Delete any existing OTP for this phone number
  const deleteSql = "DELETE FROM `adminOtp` WHERE `Phone_number` = ?";
  db.query(deleteSql, [phone], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error 1' });
    }

    // Insert the new OTP with expiration time
    const insertSql = "INSERT INTO `adminOtp` (`Phone_number`, `Otp`, `User_id`, `Expiry`) VALUES (?, ?, ?, ?)";
    db.query(insertSql, [phone, otp, adminId, expiry], async (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error 2' });
      }

      // Send OTP to the user via SMS
      const smsResponse = await sendOtpViaSMS(phone, otp);
      if (smsResponse && smsResponse.return) {
        res.json({ message: 'OTP generated and sent successfully', otp, adminId });
      } else {
        res.status(500).json({ error: 'Failed to send OTP via SMS' });
      }
    });
  });
});
router.post('/admin/otp_1', (req, res) => {
  const { adminPhone } = req.body;
  const adminId = 11;

  // Validate adminPhone number
  if (!adminPhone || !/^\d{10}$/.test(adminPhone)) {
    return res.status(400).json({ error: 'Invalid adminPhone number' });
  }

  // Generate a random 6-digit OTP
  const otp = crypto.randomInt(100000, 999999);
  const expiry = new Date(Date.now() + 60 * 10000); // Expire after 1 minute

  // Delete any existing OTP for this adminPhone number
  const deleteSql = "DELETE FROM `adminOtp` WHERE `Phone_number` = ?";
  db.query(deleteSql, [adminPhone], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error 1' });
    }

    // Insert the new OTP with expiration time
    const insertSql = "INSERT INTO `adminOtp` (`Phone_number`, `Otp`, `User_id`, `Expiry`) VALUES (?, ?, ?, ?)";
    db.query(insertSql, [adminPhone, otp, adminId, expiry], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error 2' });
      }

      res.json({ message: 'OTP generated successfully', otp, adminId });
    });
  });
});













router.post('/v2/admin/register', async (req, res) => {
  // Validation schema
  const schema = Joi.object({
    adminUserName: Joi.string().min(2).max(100).required().label("admin user name"),
    adminPassword: Joi.string().min(2).max(100).required().label("admin password"),
    adminPhone: Joi.string().pattern(/^\d{10}$/).required().label("Phone"),
    otp: Joi.string().length(6).required().label("OTP"),
  });

  // Validate request body
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { adminUserName, adminPassword, adminPhone,otp } = req.body;

  try {
    // Step 1: Check OTP validity
    const fetchOtpSql = "SELECT otp, Expiry FROM adminOtp WHERE Phone_number = ?";
    const [otpResults] = await db.promise().query(fetchOtpSql, [adminPhone]);

    if (otpResults.length === 0) {
      return res.status(404).json({ error: "No OTP record found for the provided phone number" });
    }

    const { otp: fetchedOtp, Expiry: expiry } = otpResults[0];
    if (moment().isAfter(moment(expiry))) {
      return res.status(400).json({ error: "OTP has expired" });
    }
    if (fetchedOtp !== otp) {
      return res.status(400).json({ error: "Provided OTP does not match" });
    }

    // Step 2: Check if user already exists
    const checkUserQuery = "SELECT * FROM `admin` WHERE `adminUserName` = ? OR `adminPhone` = ?";
    const [userResults] = await db.promise().query(checkUserQuery, [adminUserName, adminUserName]);

    if (userResults.length > 0) {
      return res.status(400).json({ error: "User already exists with the provided email or phone number" });
    }

    // Step 3: Insert new user
    const insertUserQuery = `
      INSERT INTO admin (adminUserName, adminPassword,adminPhone,adminDate) 
      VALUES (?, ?, ?,current_timestamp());
    `;
    const [insertResults] = await db.promise().query(insertUserQuery, [
      adminUserName, adminPassword, adminPhone,
    ]);

    res.status(201).json({
      message: "User registered successfully",
      adminId: insertResults.insertId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});








module.exports = router;

