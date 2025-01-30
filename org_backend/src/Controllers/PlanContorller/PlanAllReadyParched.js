const express = require('express');
const db = require('../../db/Conn.js');

const planAlreadyPurchased = (UserId) => {
  return new Promise((resolve, reject) => {
    const userPurchaseQuery = "SELECT UserId, PlanId FROM Payments WHERE UserId = ?";
    
    db.query(userPurchaseQuery, [UserId], (err, userPurchase) => {
      if (err) {
        console.error('Database Error:', err);
        return reject({ error: "Database error", details: err.message });
      }

      if (userPurchase.length > 0) {
        return resolve({ status: 409, message: "Plan already purchased" });
      }
      resolve({ status: 200, message: "No plan purchased" });
    });
  });
};

module.exports = { planAlreadyPurchased };