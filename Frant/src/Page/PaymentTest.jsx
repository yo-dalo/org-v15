import axios from "axios";
import { load } from "@cashfreepayments/cashfree-js";
import React, { useState, useContext ,useEffect} from 'react';
import { AuthContext } from '../Context';

function PaymentTest() {
  const [sessionId, setSessionId] = useState(null);
  let cashfree;

  useEffect(() => {
    const initializeCashfree = async () => {
      try {
        cashfree = await load({ mode: "sandbox" });
      } catch (error) {
        console.error("Cashfree SDK failed to load", error);
      }
    };
    initializeCashfree();
  }, []);

  const getSessionId = async () => {
    try {
      const response = await axios.post(
        "/api/payment/create",
        { amount: 1000, currency: "INR", customer_id: "user123" },
        { withCredentials: true }
      );
      if (response.data.payment_session_id) {
        setSessionId(response.data.payment_session_id);
        return response.data.payment_session_id;
      }
    } catch (error) {
      console.error("Error creating session:", error);
    }
  };

  const handlePayment = async () => {
    try {
      let sessionId = await getSessionId();
      if (!sessionId) return;

      let checkoutOptions = {
        paymentSessionId: sessionId,
        redirectTarget: "_modal",
      };

      await cashfree.checkout(checkoutOptions);
      console.log("Payment process started");
    } catch (error) {
      console.error("Error during payment:", error);
    }
  };

  return (
    <div>
      <h2>Cashfree Payment Gateway</h2>
      <button onClick={handlePayment} className="btn-pay">Pay Now</button>
    </div>
  );
}

export default PaymentTest;