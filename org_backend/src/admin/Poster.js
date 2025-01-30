const express = require('express');
const db = require("../db/Conn");
const {userAuth} =require("../Utility/auth");
const upload =require("../Utility/multer");
const router = express.Router();







// Create a new poster
router.post("/posters",upload.single("Img"),(req, res) => {
    const Img = req.file?.filename || null;
    
    

  const { Text, Status, index } = req.body;

  const query = `INSERT INTO Poster (Img, Text, Status, \`index\`) VALUES (?, ?, ?, ?)`;

  db.query(query, [Img, Text, Status, index], (err, result) => {
    if (err) {
      res.status(500).json({ message: "Error creating poster", error: err.message });
    } else {
      res.status(201).json({ message: "Poster created successfully!", posterId: result.insertId });
    }
  });
});

// Edit a poster
router.put("/posters/:id", (req, res) => {
  const { id } = req.params;
  const { Img, Text, Status, index } = req.body;

  const query = `UPDATE Poster 
                 SET Img = ?, Text = ?, Status = ?, \`index\` = ? 
                 WHERE Id = ?`;

  db.query(query, [Img, Text, Status, index, id], (err, result) => {
    if (err) {
      res.status(500).json({ message: "Error updating poster", error: err.message });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: "Poster not found" });
    } else {
      res.status(200).json({ message: "Poster updated successfully!" });
    }
  });
});

// Get all posters
router.get("/posters", (req, res) => {
  const query = "SELECT * FROM Poster";

  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ message: "Error fetching posters", error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
});

// Get poster by ID
router.get("/posters/:id", (req, res) => {
  const { id } = req.params;

  const query = "SELECT * FROM Poster WHERE Id = ?";

  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).json({ message: "Error fetching poster", error: err.message });
    } else if (results.length === 0) {
      res.status(404).json({ message: "Poster not found" });
    } else {
      res.status(200).json(results[0]);
    }
  });
});

// Update poster status
router.patch("/posters/:id/status", (req, res) => {
  const { id } = req.params;
  const { Status } = req.body;

  const query = `UPDATE Poster SET Status = ? WHERE Id = ?`;

  db.query(query, [Status, id], (err, result) => {
    if (err) {
      res.status(500).json({ message: "Error updating poster status", error: err.message });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: "Poster not found" });
    } else {
      res.status(200).json({ message: "Poster status updated successfully!" });
    }
  });
});



module.exports = router;