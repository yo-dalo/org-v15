const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const storage = multer.diskStorage({
  destination: (req,
    file,
    cb) => {
    cb(null,
      './uploads/');
  },
  filename: (req,
    file,
    cb) => {
    cb(null,
      Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({
  storage: storage
});


// Endpoint to add a category
router.post('/api/poster', 
upload.fields([
  { name: "Img", maxCount: 1 },
  {name:"FamilyIdImg",maxCount:1},
  {name:"AadhaarFrontImg",maxCount:1},
  {name:"AadhaarBackImg",maxCount:1},
  {name:"Signature",maxCount:1},
  ]),
async (req, res) => {
  
  const file = req.files;
  console.log(file);


})

// Serve static files from the uploads directory
router.use('./uploads', express.static('uploads'));
module.exports = router;