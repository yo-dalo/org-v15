const express = require('express');
const db = require("../db/Conn");
const {userAuth} =require("../Utility/auth");
const router = express.Router();


/*
SELECT 'Users' AS table_name, COUNT(*) AS total_rows FROM Users

UNION ALL

SELECT 'admin' AS table_name, COUNT(*) AS total_rows FROM 
admin

UNION ALL

SELECT 'Payments' AS table_name, COUNT(*) AS total_rows FROM Payments

UNION ALL

SELECT 'Plans' AS table_name, COUNT(*) AS total_rows FROM Plans

UNION ALL

SELECT 'order_amount' AS table_name, SUM(order_amount) AS total_rupees FROM Payments;
*/





//get new Users
/*
SELECT * FROM Users
LIMIT 10;


/*



router.get('/show/user/profile',userAuth, (req, res) => {
  console.log( req.user)
  
  const sqli = "";
  db.query(sqli, [req.user.UserId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error while getting OTP' });
    }

  console.log(req.user.UserId);
  
    res.json({ message: results });
});
});










module.exports = router;