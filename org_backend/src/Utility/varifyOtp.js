//const db = require("../db/Conn");
import db from '../db/Conn.js';
export const verifyOtp = (req, res, next) => {
  const { phone, otp } = req.body;
  // Validate phone number
  if (!phone || !/^\d{10}$/.test(phone)) {
    return res.status(400).json({ error: 'Invalid phone number format' });
  }
  // Check if OTP is provided
  if (!otp) {
    return res.status(400).json({ error: 'OTP is required' });
  }
  const sqlQuery = "SELECT otp, Phone_number, Expiry FROM Otp WHERE Phone_number = ?";
  db.query(sqlQuery, [phone], (err, results) => {
    if (err) {
      console.error('Database Error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // No record found
    if (results.length === 0) {
      return res.status(404).json({ error: 'No record found for the provided phone number' });
    }

    const { otp: storedOtp, Expiry: expiry } = results[0];

    // Check if OTP has expired
    if (new Date() > expiry) {
      return res.status(400).json({ error: 'OTP has expired' });
    }

    // Verify the OTP
    if (storedOtp !== otp) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    // Mark verification as successful
    req.verifyOtp = true;
    next();
  });
  
  
  
  
};