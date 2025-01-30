const express = require('express');
const db = require("../db/Conn");
const {userAuth} =require("../Utility/auth");
const router = express.Router();

// ------------------- Routes -------------------

// Create a new site info entry
router.post("/sitinfo", (req, res) => {
  const { Title, Name, Info, Info2, Info3, Email, About, Logo } = req.body;

  const query = `INSERT INTO SitInfo (Title, Name, Info, Info2, Info3, Email, About, Logo) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(query, [Title, Name, Info, Info2, Info3, Email, About, Logo], (err, result) => {
    if (err) {
      res.status(500).json({ message: "Error creating site info", error: err.message });
    } else {
      res.status(201).json({ message: "Site info created successfully!", id: result.insertId });
    }
  });
});

// Edit site info by ID
router.put("/sitinfo/:id", (req, res) => {
  const { id } = req.params;
  const { Title, Name, Info, Info2, Info3, Email, About, Logo } = req.body;

  const query = `UPDATE SitInfo 
                 SET Title = ?, Name = ?, Info = ?, Info2 = ?, Info3 = ?, Email = ?, About = ?, Logo = ? 
                 WHERE Id = ?`;

  db.query(
    query,
    [Title, Name, Info, Info2, Info3, Email, About, Logo, id],
    (err, result) => {
      if (err) {
        res.status(500).json({ message: "Error updating site info", error: err.message });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ message: "Site info not found" });
      } else {
        res.status(200).json({ message: "Site info updated successfully!" });
      }
    }
  );
});

// Get all site info entries
router.get("/sitinfo", (req, res) => {
  const query = "SELECT * FROM SitInfo";

  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ message: "Error fetching site info", error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
});

// Get site info by ID
router.get("/sitinfo/:id", (req, res) => {
  const { id } = req.params;

  const query = "SELECT * FROM SitInfo WHERE Id = ?";

  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).json({ message: "Error fetching site info", error: err.message });
    } else if (results.length === 0) {
      res.status(404).json({ message: "Site info not found" });
    } else {
      res.status(200).json(results[0]);
    }
  });
});

// Delete site info by ID
router.delete("/sitinfo/:id", (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM SitInfo WHERE Id = ?";

  db.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).json({ message: "Error deleting site info", error: err.message });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: "Site info not found" });
    } else {
      res.status(200).json({ message: "Site info deleted successfully!" });
    }
  });
});

module.exports = router;