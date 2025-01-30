const express = require('express');
const router = express.Router();
const db = require("../../db/Conn");
const {userAuth} =require("../../Utility/auth");
const multer = require("multer");
const path = require('path');

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../../uploads');
const fs = require('fs');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
});












// POST route to add user details
router.post("/addUserDetails",userAuth,
upload.fields([
  { name: "Img", maxCount: 1 },
  {name:"FamilyIdImg",maxCount:1},
  {name:"AadhaarFrontImg",maxCount:1},
  {name:"AadhaarBackImg",maxCount:1},
  {name:"Signature",maxCount:1},
  ]),
(req, res) => {
 // const UserId = req.user.UserId || 25;
  const UserId =  req.user.UserId;
  
  const {
    AadhaarCardNumber,
    FamilyIdNumber,
    Village,
    RegistrationId,
  } = req.body;

  console.log("Files Received:", req.files);
  

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files uploaded.");
  }

  const Img = req.files["Img"]?.[0]?.filename || null;
  const FamilyIdImg = req.files["FamilyIdImg"]?.[0]?.filename || null;
  const AadhaarFrontImg = req.files["AadhaarFrontImg"]?.[0]?.filename || null;
  const AadhaarBackImg = req.files["AadhaarBackImg"]?.[0]?.filename || null;
  const Signature = req.files["Signature"]?.[0]?.filename || null;




  const sql = `
    INSERT INTO UserDetails (
      UserId, Img, AadhaarCardNumber, FamilyIdNumber, Village,
      FamilyIdImg, AadhaarFrontImg, AadhaarBackImg, RegistrationId,
      Signature, PaymentId, DetailsPlanId
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

const sqli_1 =`INSERT INTO UserDetails( UserId, Img, AadhaarCardNumber, FamilyIdNumber, Village,FamilyIdImg, AadhaarFrontImg, AadhaarBackImg, RegistrationId, Signature)VALUES( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

  db.query(sqli_1, [
    UserId, Img, AadhaarCardNumber, FamilyIdNumber, Village,
    FamilyIdImg, AadhaarFrontImg, AadhaarBackImg, RegistrationId,
    Signature,
  ], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).send("Error saving user details.");
    }
    res.status(200).send("User details added successfully!");
  });
});

module.exports = router;