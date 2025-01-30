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
router.post("/upload/card",
upload.single("card"),
(req, res) => {
res.send("56");

  
});

module.exports = router;