const express = require('express');
const db = require("../../db/Conn");
const {userAuth} =require("../../Utility/auth");
const router = express.Router();


//get user profile details  user ,UserDetails,who has bay plain
///SELECT u.*,ud.*,p.*,pl.* FROM Users u LEFT JOIN UserDetails ud ON u.UserId = ud.UserId left join Payments p on p.UserId=u.UserId left join Plans pl on pl.PlanId=p.PlanId WHERE u.UserId = 24;


router.get('/show/user/profile',userAuth, (req, res) => {
  console.log( req.user)
  
  const sqli = "SELECT * FROM Users WHERE UserId  = ?";
  db.query(sqli, [req.user.UserId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error while getting OTP' });
    }

  console.log(req.user.UserId);
  
    res.json({ message: results });
});
});
router.get('/show/Payments/info',userAuth, (req, res) => {
 // console.log( req.user)
  
  
const sqli = ` SELECT
    PaymentId,
    UserId,
    PlanId,
    order_currency,
    order_id,
    payment_method,
    is_captured,
    payment_completion_time,
    payment_currency,
    bank_reference,
    cf_payment_id,
    order_amount,
    gateway_name,
    gateway_order_id,
    gateway_payment_id,
    payment_group,
    payment_message,
    payment_status,
    payment_time
FROM
    Payments
WHERE
    UserId = ?`
  
  
    db.query(sqli, [req.user.UserId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error while getting OTP' });
    }
    if(results.length===0){
      return res.status(400).json({ error: 'no data found ' });
    }

  console.log(results);
  
    res.status(200).json({ message: results });
});
});











module.exports = router;