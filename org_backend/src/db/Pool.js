const mysql = require('mysql');
const pool = mysql.createPool({
  host: '127.0.101',
  user: 'root',
  password: 'root',
  database: 'org',
  connectionLimit: 10,
});

module.exports = pool;