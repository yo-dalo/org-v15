const express = require('express');
const db = require('../../db/Conn.js');

const getPlan = (plansId) => {
  return new Promise((resolve, reject) => {
    const planQuery = "SELECT `PlanId`, `PlanFee`, `PlanState` FROM Plans WHERE PlanId = ?";
    
    db.query(planQuery, [plansId], (err, plansResult) => {
      if (err) {
        console.error('Database Error:', err);
        return reject({ error: "Database error", details: err.message });
      }
      
      if (plansResult.length === 0) {
        return resolve({ status: 404, message: "Plan not found" });
      }

      const planData = plansResult[0];
      if (planData.PlanState === 0) {
        return resolve({ status: 409, message: "Plan is already active" });
      }
      resolve({ status: 200, data: planData });
    });
  });
};

module.exports = { getPlan };