const express = require('express');
const config = require('../config/env');
const crypto = require('crypto');
const {addPayment} = require('../Controllers/PaymentController/AddPayment.js');
const {planAlreadyPurchased} = require('../Controllers/PlanContorller/PlanAllReadyParched.js');
const db = require('../db/Conn.js');
const {userAuth} =require("./auth");
const {
  Cashfree
} = require('cashfree-pg');
const axios = require('axios');
const router = express.Router();


 Cashfree.XClientId = config.cashfreeXClientId;
Cashfree.XClientSecret = config.cashfreeXClientSecret;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;


function verifyWebhookSignature(req, secretKey) {
  const signature = req.headers['x-webhook-signature'];
  const timestamp = req.headers['x-webhook-timestamp'];
  const body = timestamp + JSON.stringify(req.body);

  const generatedSignature = crypto
    .createHmac('sha256', secretKey)
    .update(body)
    .digest('base64');

  return generatedSignature === signature;
}


   function generateOrderId() {
  const uniqueId = crypto.randomBytes(16).toString('hex'); const hash = crypto.createHash('sha256');
  hash.update(uniqueId); const orderId = hash.digest('hex'); return orderId.substr(0, 12);}

router.post('/payment/test/v3', userAuth, async (req, res) => {
  const { plansId } = req.body;

  if (!plansId) {
    return res.status(400).json({ error: "Plan ID is required" });
  }

  try {
    // Check if the user already purchased the plan
    const userPurchaseQuery = "SELECT UserId, PlanId FROM Payments WHERE UserId = ?";
    db.query(userPurchaseQuery, [req.user.UserId], async (err, userPurchase) => {
      if (err) return res.status(500).json({ error: "Database error" });
      
      if (userPurchase.length > 0) {
        return res.status(409).json({ message: "Plan already purchased" });
      }

      // Fetch plan details
      const planQuery = "SELECT `PlanId`, `PlanFee`, `PlanState` FROM Plans WHERE PlanId = ?";
      db.query(planQuery, [plansId], async (err, plansResult) => {
        if (err) return res.status(500).json({ error: "Database error" });
        
        if (plansResult.length === 0) {
          return res.status(404).json({ message: "Plan not found" });
        }

        const planData = plansResult[0];
        if (planData.PlanState === 0) {
          return res.status(409).json({ message: "Plan is already active" });
        }

        // Create Cashfree order
        try {
          const orderRequest = {
            order_amount: planData.PlanFee,
            order_currency: "INR",
            order_id: await generateOrderId(),
            customer_details: {
              customer_id: req.user.UserId.toString(),
              customer_phone: req.user.phone || "0000000000", // Default fallback
              customer_name: req.user.name || "Unknown User",
            },
            order_meta: {
              return_url : "http://localhost:5000/show/Payments/info"
        }
          };

          Cashfree.PGCreateOrder("2023-08-01", orderRequest)
            .then(response => {
              res.json(response.data);
              console.log(response.data);
            })
            .catch(error => {
              console.error("Cashfree API Error:", error.response?.data?.message || error.message);
              res.status(500).json({ error: "Failed to create order" });
            });
        } catch (error) {
          console.error("Error creating Cashfree order:", error.message);
          res.status(500).json({ error: "Internal server error" });
        }
      });
    });
  } catch (error) {
    console.error("Unexpected Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post('/payment/test/v4', userAuth, async (req, res) => {
  const { plansId } = req.body;

  if (!plansId) {
    return res.status(400).json({ error: "Plan ID is required" });
  }

  try {
    // Check if the user already purchased the plan
    const userPurchaseQuery = "SELECT UserId, PlanId,payment_status FROM Payments WHERE UserId = ?";
    db.query(userPurchaseQuery, [req.user.UserId], async (err, userPurchase) => {
      if (err) return res.status(500).json({ error: "Database error" });


console.log(userPurchase);

      if (userPurchase.length > 0 && userPurchase.payment_status=="PENDING") {
        return res.status(409).json({ message: "Plan already purchased but payment is pending" });
      }
      
      if (userPurchase.length > 0 && userPurchase.payment_status=="SUCCESS") {
        return res.status(409).json({ message: "Plan already purchased" });
      }

      // Fetch plan details
      const planQuery = "SELECT `PlanId`, `PlanFee`, `PlanState` FROM Plans WHERE PlanId = ?";
      db.query(planQuery, [plansId], async (err, plansResult) => {
        if (err) return res.status(500).json({ error: "Database error" });

        if (plansResult.length === 0) {
          return res.status(404).json({ message: "Plan not found" });
        }

        const planData = plansResult[0];
        if (planData.PlanState === 0) {
          return res.status(409).json({ message: "Plan is already active" });
        }

        // Create Cashfree order
        try {
          const orderRequest = {
            order_amount: planData.PlanFee,
            order_currency: "INR",
            order_id: await generateOrderId(),
            customer_details: {
              customer_id: req.user.UserId.toString(),
              customer_phone: req.user.phone || "0000000000",
              customer_name: req.user.name || "Unknown User",
            },
            order_meta: {
              return_url: "http://localhost:5000/show/Payments/info"
            }
          };

          const response = await Cashfree.PGCreateOrder("2023-08-01", orderRequest);
          const data = response.data;
        //  console.log(data);

          // Prepare SQL query and values
          const query = `
            INSERT INTO Payments (
              UserId, PlanId, order_currency, order_id, payment_method, 
              is_captured, payment_completion_time, payment_currency, bank_reference, 
              cf_payment_id, order_amount, gateway_name, gateway_order_id, 
              gateway_payment_id, payment_group, payment_message, payment_status, 
              payment_time
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `;

          const values = [
            req.user.UserId,
            plansId,
            data.order_currency || "INR",
            data.order_id,
            JSON.stringify(data.payment_method || {}),
            data.is_captured ? 1 : 0,
            data.payment_completion_time || "0.0.0.0.0",
            data.payment_currency || "INR",
            data.bank_reference || "0000000",
            data.cf_payment_id || "000000",
            data.order_amount || 0,
            data.payment_gateway_details?.gateway_name || "Cashfree",
            data.payment_gateway_details?.gateway_order_id || "0",
            data.payment_gateway_details?.gateway_payment_id || "0",
            data.payment_group || "0",
            data.payment_message || "No message",
            data.order_status || "active",
            data.payment_time || "0",
          ];

          db.query(query, values, (err, result) => {
            if (err) {
              console.error('Database Error:', err);
              return res.status(500).json({ error: 'Database error', details: err.message });
            }
            res.json(response.data);
            console.log("add");
          });

        } catch (error) {
          console.error("Cashfree API Error:", error.response?.data?.message || error.message);
          res.status(500).json({ error: "Failed to create order" });
        }
      });
    });
  } catch (error) {
    console.error("Unexpected Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});




router.post('/verify3',userAuth, async (req, res) => {
  const { orderIddd,PlanId}= req.body;
  const user = req.user.UserId;
  
  try {
    // Fetch payment details from Cashfree
    const response = await Cashfree.PGOrderFetchPayments("2023-08-01", orderIddd);
    console.log('Order fetched successfully:', response.data);

    const data = response.data[0];
    console.log(data);

    // Define the SQL query for inserting into the Payments table
    const query = `
      INSERT INTO Payments (
        UserId, PlanId, order_currency, order_id, payment_method, 
        is_captured, payment_completion_time, payment_currency, bank_reference, 
        cf_payment_id, order_amount, gateway_name, gateway_order_id, 
        gateway_payment_id, payment_group, payment_message, payment_status, 
        payment_time
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    // Prepare the values for insertion
    const values = [
      data.user || user, // Replace with actual UserId from your system if available
      data.PlanId || PlanId || 1, // Replace with actual PlanId from your system if available
      data.payment_currency,
  //    data.order_id,
      data.order_id,
      JSON.stringify(data.payment_method),
      data.is_captured ? 1 : 0,
      data.payment_completion_time,
      data.payment_currency,
      data.bank_reference,
      data.cf_payment_id,
      data.order_amount,
      data.payment_gateway_details.gateway_name,
      data.payment_gateway_details.gateway_order_id,
      data.payment_gateway_details.gateway_payment_id,
      data.payment_group,
      data.payment_message,
      data.payment_status,
      data.payment_time,
    ];

    // Insert data into the database
    db.query(query, values, (err, result) => {
      if (err) {
        console.error('Database Error:', err);
        return res.status(500).json({ error: 'Database error', details: err.message });
      }
      res.json({ message: 'Payment inserted successfully', result });
    });
    
    
    
  } catch (error) {
    console.error('Error:', error.message || error.response.data.message);
    res.status(500).json({ error: 'Failed to fetch order or insert payment', details: error.message });
  }
});





router.post('/verify4', userAuth, async (req, res) => {
  const { orderIddd, PlanId } = req.body;
  const user = req.user.UserId;

  try {
    // Fetch payment details from Cashfree
    const response = await Cashfree.PGOrderFetchPayments("2023-08-01", orderIddd);
    console.log('Order fetched successfully:', response.data);

    const data = response.data[0];
    console.log(data);

    // Define the SQL query for updating the Payments table
    const query = `
      UPDATE Payments 
      SET 
        payment_method = ?, 
        is_captured = ?, 
        payment_completion_time = ?, 
        payment_currency = ?, 
        bank_reference = ?, 
        cf_payment_id = ?, 
        order_amount = ?, 
        gateway_name = ?, 
        gateway_order_id = ?, 
        gateway_payment_id = ?, 
        payment_group = ?, 
        payment_message = ?, 
        payment_status = ?, 
        payment_time = ? 
      WHERE 
        UserId = ? 
        AND PlanId = ? 
        AND order_id = ?
    `;

    // Prepare the values for updating
    const values = [
      
      JSON.stringify(data.payment_method),
      data.is_captured ? 1 : 0,
      data.payment_completion_time,
      data.payment_currency,
      data.bank_reference,
      data.cf_payment_id,
      data.order_amount,
      data.payment_gateway_details.gateway_name,
      data.payment_gateway_details.gateway_order_id,
      data.payment_gateway_details.gateway_payment_id,
      data.payment_group,
      data.payment_message,
      data.payment_status,
      data.payment_time,
      data.user || user, // Replace with actual UserId from your system if available
      data.PlanId || PlanId || 1, // Replace with actual PlanId from your system if available
      data.order_id,
    ];

    // Update data in the database
    db.query(query, values, (err, result) => {
      if (err) {
        console.error('Database Error:', err);
        return res.status(500).json({ error: 'Database error', details: err.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'No matching record found to update' });
      }
      res.json({ message: 'Payment updated successfully', result });
    });

  } catch (error) {
    console.error('Error:', error.message || error.response?.data?.message);
    res.status(500).json({ error: 'Failed to fetch order or update payment', details: error.message });
  }
});

router.post('/webhook6', (req, res) => {
  const secretKey =  config.cashfreeXClientSecret;
//const { orderIddd, PlanId } = req.body;
//  const user = req.user.UserId;
  if (verifyWebhookSignature(req, secretKey)) {
  //  console.log('Webhook signature verified');

const data = req.body;
const order = req.body.data.order;
const payment = req.body.data.payment;
const customer_details = req.body.data.customer_details;
const payment_gateway_details = req.body.data.payment_gateway_details;

  try {
    const query = `
      UPDATE Payments 
      SET 
        payment_method = ?, 
        is_captured = ?, 
        payment_completion_time = ?, 
        payment_currency = ?, 
        bank_reference = ?, 
        cf_payment_id = ?, 
        order_amount = ?, 
        gateway_name = ?, 
        gateway_order_id = ?, 
        gateway_payment_id = ?, 
        payment_group = ?, 
        payment_message = ?, 
        payment_status = ?, 
        payment_time = ? 
      WHERE 
        UserId = ? 
        AND order_id = ?
    `;

        const values = [

      JSON.stringify(payment.payment_method),
      data.is_captured ? 1 : 1,
      payment.payment_time,
      payment.payment_currency,
      payment.bank_reference,
      payment.cf_payment_id,
      order.order_amount,
      payment_gateway_details.gateway_name,
      payment_gateway_details.gateway_order_id,
      payment_gateway_details.gateway_payment_id,
      payment.payment_group,
      payment.payment_message,
      payment.payment_status,
      payment.payment_time,
      customer_details.customer_id || user, // Replace with actual UserId from your system if available
      //data.PlanId || PlanId || 1, // Replace with actual PlanId from your system if available
      order.order_id,
    ];

    // Update data in the database
    db.query(query, values, (err, result) => {
      if (err) {
        console.error('Database Error:', err);
        return res.status(500).json({ error: 'Database error', details: err.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'No matching record found to update' });
      }
      res.json({ message: 'Payment updated successfully', result });
    });

  } catch (error) {
    console.error('Error:', error.message || error.response?.data?.message);
    res.status(500).json({ error: 'Failed to fetch order or update payment', details: error.message });
  }


  //  res.sendStatus(200);
  } else {
    
    console.log('Invalid webhook signature');
    res.sendStatus(400);
  }
});




router.post('/verify4', userAuth, async (req, res) => {
  
  
  
  
  const { orderIddd, PlanId } = req.body;
  const user = req.user.UserId;

  try {
    // Fetch payment details from Cashfree
    const response = await Cashfree.PGOrderFetchPayments("2023-08-01", orderIddd);
    console.log('Order fetched successfully:', response.data);

    const data = response.data[0];
    console.log(data);

    // Define the SQL query for updating the Payments table
    const query = `
      UPDATE Payments 
      SET 
        payment_method = ?, 
        is_captured = ?, 
        payment_completion_time = ?, 
        payment_currency = ?, 
        bank_reference = ?, 
        cf_payment_id = ?, 
        order_amount = ?, 
        gateway_name = ?, 
        gateway_order_id = ?, 
        gateway_payment_id = ?, 
        payment_group = ?, 
        payment_message = ?, 
        payment_status = ?, 
        payment_time = ? 
      WHERE 
        UserId = ? 
        AND PlanId = ? 
        AND order_id = ?
    `;

    // Prepare the values for updating
    const values = [
      
      JSON.stringify(data.payment_method),
      data.is_captured ? 1 : 0,
      data.payment_completion_time,
      data.payment_currency,
      data.bank_reference,
      data.cf_payment_id,
      data.order_amount,
      data.payment_gateway_details.gateway_name,
      data.payment_gateway_details.gateway_order_id,
      data.payment_gateway_details.gateway_payment_id,
      data.payment_group,
      data.payment_message,
      data.payment_status,
      data.payment_time,
      data.user || user, // Replace with actual UserId from your system if available
      data.PlanId || PlanId || 1, // Replace with actual PlanId from your system if available
      data.order_id,
    ];

    // Update data in the database
    db.query(query, values, (err, result) => {
      if (err) {
        console.error('Database Error:', err);
        return res.status(500).json({ error: 'Database error', details: err.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'No matching record found to update' });
      }
      res.json({ message: 'Payment updated successfully', result });
    });

  } catch (error) {
    console.error('Error:', error.message || error.response?.data?.message);
    res.status(500).json({ error: 'Failed to fetch order or update payment', details: error.message });
  }
});




























router.post("/payment/create", async (req, res) => {
  const { amount, currency, customer_id } = req.body;

  try {
    const response = await axios.post(
      "https://sandbox.cashfree.com/pg/orders",
      {
        order_id: `order_${Date.now()}`,
        order_amount: amount,
        order_currency: currency,
        customer_details: {
          customer_id,
          customer_email: "customer@example.com",
          customer_phone: "9999999999",
        },
      },
      {
        headers: {
          "x-api-version": "2022-01-01",
          "x-client-id": config.cashfreeXClientId,
          "x-client-secret": config.cashfreeXClientSecret,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
    console.log(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error creating payment order" });
  }
});



router.post("/payment_1",(req,res)=>{
  UserId = 25;
  const { plansId } = req.body;
    if (!plansId) {
    return res.status(400).json({ error: "Plan ID is required" });
  }
  planAlreadyPurchased(UserId).then((e)=>{
    if(e.status==409){
      return  res.send(e)
    }
    
    
    
    
    
    
  }).catch((err)=>{

  })
  
  
})


router.post('/webhook_1', (req, res) => {
  const signature = req.headers['x-cashfree-signature'];

  if (verifySignature(req.body, signature)) {
    const { order_id, payment_status, txn_id, amount } = req.body;

    // Update the order status in the database
    //const query = 'UPDATE orders SET status = ? WHERE order_id = ?';
   // const newStatus = payment_status === 'SUCCESS' ? 'PAID' : 'FAILED';
 //   db.query(query, [newStatus, order_id], (err, result) => {
    //  if (err) throw err;
     // console.log('Order status updated:', result);
  //  });
  console.log('ok');

    res.status(200).send('Webhook received');
  } else {
    console.log('Invalid signature');
    res.status(400).send('Invalid signature');
  }
});










module.exports = router;