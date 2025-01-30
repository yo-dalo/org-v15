const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const db = require("../../db/Conn");
const axios = require('axios');
const Joi = require('joi');
const moment = require('moment');
const config = require('../../config/env');

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
  const User_id = 11;

  // Validate phone number
  if (!phone || !/^\d{10}$/.test(phone)) {
    return res.status(400).json({ error: 'Invalid phone number' });
  }

  // Generate a random 6-digit OTP
  const otp = crypto.randomInt(100000, 999999);
  const expiry = new Date(Date.now() + 10 * 60 * 100); // Expire after 1 minute

  // Delete any existing OTP for this phone number
  const deleteSql = "DELETE FROM `Otp` WHERE `Phone_number` = ?";
  db.query(deleteSql, [phone], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error 1' });
    }

    // Insert the new OTP with expiration time
    const insertSql = "INSERT INTO `Otp` (`Phone_number`, `Otp`, `User_id`, `Expiry`) VALUES (?, ?, ?, ?)";
    db.query(insertSql, [phone, otp, User_id, expiry], async (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error 2' });
      }

      // Send OTP to the user via SMS
      const smsResponse = await sendOtpViaSMS(phone, otp);
      if (smsResponse && smsResponse.return) {
        res.json({ message: 'OTP generated and sent successfully', otp, User_id });
      } else {
        res.status(500).json({ error: 'Failed to send OTP via SMS' });
      }
    });
  });
});



router.post('/otp_1', (req, res) => {
  const { phone } = req.body;
  const User_id = 11;

  // Validate phone number
  if (!phone || !/^\d{10}$/.test(phone)) {
    return res.status(400).json({ error: 'Invalid phone number' });
  }

  // Generate a random 6-digit OTP
  const otp = crypto.randomInt(100000, 999999);
  const expiry = new Date(Date.now() + 60 * 10000); // Expire after 1 minute

  // Delete any existing OTP for this phone number
  const deleteSql = "DELETE FROM `Otp` WHERE `Phone_number` = ?";
  db.query(deleteSql, [phone], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error 1' });
    }

    // Insert the new OTP with expiration time
    const insertSql = "INSERT INTO `Otp` (`Phone_number`, `Otp`, `User_id`, `Expiry`) VALUES (?, ?, ?, ?)";
    db.query(insertSql, [phone, otp, User_id, expiry], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error 2' });
      }

      res.json({ message: 'OTP generated successfully', otp, User_id });
      console.log(otp);
    });
  });
});

router.post('/register', (req, res) => {
  const { 
    user_name, father_name, mother_name, dob, address, email, phone, district, state, pincode, age, gender, otp 
  } = req.body;

  if (!phone || !/^\d{10}$/.test(phone)) {
    return res.status(400).json({ error: 'Invalid phone number' });
  }

  // Fetch OTP and validate expiration
  const fetchOtpSql = "SELECT otp, Expiry FROM Otp WHERE Phone_number = ?";
  db.query(fetchOtpSql, [phone], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error while getting OTP' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'No record found for the provided phone number' });
    }

    const fetchedOtp = results[0].otp;
    const expiry = results[0].Expiry;

    if (!fetchedOtp || new Date() > expiry) {
      return res.status(400).json({ error: 'OTP has expired' });
    }

    if (fetchedOtp !== otp) {
      return res.status(400).json({ error: 'Provided OTP does not match' });
    }

    // Check if the user already exists
    const checkUserQuery = "SELECT * FROM `Users` WHERE `Email` = ? OR `Phone` = ?";
    db.query(checkUserQuery, [email, phone], (err, userResults) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error while checking user existence' });
      }

      if (userResults.length > 0) {
        return res.status(400).json({ error: 'User already exists with the provided email or phone number' });
      }

      // Input validation
      if (!user_name || !email || !phone) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Insert new user into the database
      const insertUserQuery = `
        INSERT INTO Users (UserName, FatherName, MotherName, DOB, Address, Email, Phone, District, State, Pincode, Age, Gender) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
      `;
      db.query(insertUserQuery, 
        [user_name, father_name, mother_name, dob, address, email, phone, district, state, pincode, age, gender],
        (err, insertResults) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error while registering user' });
          }

          res.json({ 
            message: 'User registered successfully', 
            userId: insertResults.insertId 
          });
        }
      );
    });
  });
});






router.post('/v1/register', async (req, res) => {
  const schema = Joi.object({
    user_name: Joi.string().required(),
    father_name: Joi.string().optional(),
    mother_name: Joi.string().optional(),
    dob: Joi.date().required(),
    address: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^\d{10}$/).required(),
    district: Joi.string().optional(),
    state: Joi.string().optional(),
    pincode: Joi.string().length(6).required(),
    age: Joi.number().min(0).required(),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    otp: Joi.string().length(6).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { user_name, father_name, mother_name, dob, address, email, phone, district, state, pincode, age, gender, otp } = req.body;

  try {
    const fetchOtpSql = "SELECT otp, Expiry FROM Otp WHERE Phone_number = ?";
    const [results] = await db.promise().query(fetchOtpSql, [phone]);

    if (!results.length) {
      return res.status(404).json({ error: 'No OTP record found for the provided phone number' });
    }

    const { otp: fetchedOtp, Expiry: expiry } = results[0];

    if (moment().isAfter(moment(expiry))) {
      return res.status(400).json({ error: 'OTP has expired' });
    }

    if (fetchedOtp !== otp) {
      return res.status(400).json({ error: 'Provided OTP does not match' });
    }

    const checkUserQuery = "SELECT * FROM `Users` WHERE `Email` = ? OR `Phone` = ?";
    const [userResults] = await db.promise().query(checkUserQuery, [email, phone]);

    if (userResults.length > 0) {
      return res.status(400).json({ error: 'User already exists with the provided email or phone number' });
    }

    const insertUserQuery = `
      INSERT INTO Users (UserName, FatherName, MotherName, DOB, Address, Email, Phone, District, State, Pincode, Age, Gender) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    const [insertResults] = await db.promise().query(insertUserQuery, [
      user_name, father_name, mother_name, dob, address, email, phone, district, state, pincode, age, gender,
    ]);

    res.json({ message: 'User registered successfully', userId: insertResults.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.post('/v2/register', async (req, res) => {
  // Validation schema
  const schema = Joi.object({
    user_name: Joi.string().min(2).max(100).required().label("User Name"),
    father_name: Joi.string().min(2).max(100).optional().allow(null, '').label("Father Name"),
    mother_name: Joi.string().min(2).max(100).optional().allow(null, '').label("Mother Name"),
    dob: Joi.date().max('now').required().label("Date of Birth"),
    address: Joi.string().min(5).max(255).required().label("Address"),
    email: Joi.string().email().required().label("Email"),
    phone: Joi.string().pattern(/^\d{10}$/).required().label("Phone"),
    district: Joi.string().optional().allow(null, '').label("District"),
    state: Joi.string().optional().allow(null, '').label("State"),
    pincode: Joi.string().length(6).required().label("Pincode"),
    age: Joi.number().min(0).max(120).required().label("Age"),
    gender: Joi.string().valid('male', 'female', 'other').required().label("Gender"),
    otp: Joi.string().length(6).required().label("OTP"),
  });

  // Validate request body
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { user_name, father_name, mother_name, dob, address, email, phone, district, state, pincode, age, gender, otp } = req.body;

  try {
    // Step 1: Check OTP validity
    const fetchOtpSql = "SELECT otp, Expiry FROM Otp WHERE Phone_number = ?";
    const [otpResults] = await db.promise().query(fetchOtpSql, [phone]);

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
    const checkUserQuery = "SELECT * FROM `Users` WHERE `Email` = ? OR `Phone` = ?";
    const [userResults] = await db.promise().query(checkUserQuery, [email, phone]);

    if (userResults.length > 0) {
      return res.status(400).json({ error: "User already exists with the provided email or phone number" });
    }

    // Step 3: Insert new user
    const insertUserQuery = `
      INSERT INTO Users (UserName, FatherName, MotherName, DOB, Address, Email, Phone, District, State, Pincode, Age, Gender) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    const [insertResults] = await db.promise().query(insertUserQuery, [
      user_name, father_name, mother_name, dob, address, email, phone, district, state, pincode, age, gender,
    ]);

    res.status(201).json({
      message: "User registered successfully",
      userId: insertResults.insertId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});








module.exports = router;