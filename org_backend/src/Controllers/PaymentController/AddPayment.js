const express = require('express');
const db = require('../../db/Conn.js');

const addPayment = (values) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO Payments (
        UserId, PlanId, order_currency, order_id, payment_method, 
        is_captured, payment_completion_time, payment_currency, bank_reference, 
        cf_payment_id, order_amount, gateway_name, gateway_order_id, 
        gateway_payment_id, payment_group, payment_message, payment_status, 
        payment_time
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(query, values, (err, result) => {
      if (err) {
        console.error('Database Error:', err);
        return reject({ error: 'Database error', details: err.message });
      }
      resolve({ message: 'Payment inserted successfully', result });
    });
  });
};

module.exports = { addPayment };