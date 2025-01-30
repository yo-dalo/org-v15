const express = require('express');
const db = require("../db/Conn");
const {userAuth} =require("../Utility/auth");
const router = express.Router();


// Create a new plan
router.post("/admin/plans", (req, res) => {
  const { PlanName, PlanDuration, PlanFee, PlanReturnPrice, PlanState, PlanInformation } = req.body;

  const query = `INSERT INTO Plans (PlanName, PlanDuration, PlanFee, PlanReturnPrice, PlanState, PlanInformation) 
                 VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(
    query,
    [PlanName, PlanDuration, PlanFee, PlanReturnPrice, PlanState, PlanInformation],
    (err, result) => {
      if (err) {
        res.status(500).json({ message: "Error creating plan", error: err.message });
      } else {
        res.status(201).json({ message: "Plan created successfully!", planId: result.insertId });
      }
    }
  );
});

// Edit a plan
router.put("/admin/plans/:id", (req, res) => {
  const { id } = req.params;
  const { PlanName, PlanDuration, PlanFee, PlanReturnPrice, PlanState, PlanInformation } = req.body;

  const query = `UPDATE Plans 
                 SET PlanName = ?, PlanDuration = ?, PlanFee = ?, PlanReturnPrice = ?, PlanState = ?, PlanInformation = ? 
                 WHERE PlanId = ?`;

  db.query(
    query,
    [PlanName, PlanDuration, PlanFee, PlanReturnPrice, PlanState, PlanInformation, id],
    (err, result) => {
      if (err) {
        res.status(500).json({ message: "Error updating plan", error: err.message });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ message: "Plan not found" });
      } else {
        res.status(200).json({ message: "Plan updated successfully!" });
      }
    }
  );
});

// Get all plans
router.get("/admin/plans", (req, res) => {
  const query = "SELECT * FROM Plans";

  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ message: "Error fetching plans", error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
});

// Get plan by ID
router.get("/admin/plans/:id", (req, res) => {
  const { id } = req.params;

  const query = "SELECT * FROM Plans WHERE PlanId = ?";

  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).json({ message: "Error fetching plan", error: err.message });
    } else if (results.length === 0) {
      res.status(404).json({ message: "Plan not found" });
    } else {
      res.status(200).json(results[0]);
    }
  });
});









module.exports = router;