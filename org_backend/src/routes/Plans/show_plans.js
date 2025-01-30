const express = require('express');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const db = require("../../db/Conn");
const {userAuth} =require("../../Utility/auth");
const router = express.Router();


router.get("/show/plans",(req,res)=>{
 
 const sqli = "SELECT * FROM `Plans`"
 
 db.query(sqli, (err, results) => {
   if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error while getting OTP' });
    }
    console.log(results);
      res.status(200).json({ results });
   
   
 })
 
  
})

router.get("/show/plans/:id",userAuth,(req,res)=>{
  
 const userId = req.params.id;
 
 const sqli = "SELECT * FROM `Plans` Where PlanId = ?"
 //const sqli = "SELECT * FROM `Users` Where userId = ?"
 
 db.query(sqli,[userId],(err, results) => {
   if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error while getting OTP' });
    }
    const result = { ...results[0], name: req.user.name };

  res.status(200).json({result});
  console.log(result);
   
   
 })
 
  
})



module.exports = router;