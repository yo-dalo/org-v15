const mysql = require('mysql2');
const config = require('../config/env');



const db = mysql.createConnection({
  host: config.host, // Replace with your MySQL host
  user: config.user,      // Replace with your MySQL username
  password: config.password,      // Replace with your MySQL password
  database: config.database,  // Replace with your MySQL database name
});


db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    return;
  }
  console.log('Connected to MySQL database');
});


module.exports = db;