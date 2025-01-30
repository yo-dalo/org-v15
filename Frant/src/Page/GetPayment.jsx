import React, { useState, useContext ,useEffect} from 'react';


import Nav2 from "../Part/Nav2"

import { AuthContext } from '../Context';
import {myToast} from '../Toast';

import axios from "axios";
import Cookies from 'js-cookie';
import {Link ,useNavigate} from "react-router-dom";
const GetPayment = () => {
  const {setLoading} = useContext(AuthContext);
  const navigate = useNavigate();
  const { user ,auth_cookia,chack,setUserLogin,userLogin,setLoGin} = useContext(AuthContext);
  const [formData, setFormData] = useState({
    card: "",
  });
  
  const [card, setCard] = useState(null);
  
  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate card number and OTP
  const validate = () => {
    let valid = true;
    const newErrors = {};
    if (!card) newErrors.card = "Card is required.";
    setErrors(newErrors);
    return valid;
  };

  
  const login = () => {
    if (!validate()) return;

const formDataObj = new FormData();
   formDataObj.append("card", card);





    axios
      .post("/api/upload/card", formData, 
                  {
    withCredentials: true, // Ensure cookies are sent
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  )
      .then((response) => {
        //alert("Login successful!");
        
        myToast.success("Login successful!")
      
      })
      .catch((error) => {
        console.error("Error verifying OTP:", error);
       // alert(error.response?.data?.error || "Error occurred");
        myToast.warn(error.response?.data?.error || "Error occurred")
      });
  };

  return (
    <>
    <Nav2 />
    <div className="min-h-screen flex flex-col py-16 items-center bg-gradient-to-r from-blue-100 to-blue-300">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
      
        <p className="text-sm text-center text-gray-500 mb-4">
          Please Upload with your Card 
        </p>

        <form>
          {/* card Number */}
          <div className="mb-4">
            <label
              htmlFor="card"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Card 
            </label>
            <input
              type="file"
              name="card"
             // value={formData.card}
              onChange={(e) => setCard(e.target.files[0])}
              id="card"
              placeholder="Enter your card number"
              className={`w-full px-4 py-2 border ${
                errors.card ? "border-red-500" : "border-gray-300"
              } rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-300 focus:outline-none`}
            />
            {errors.card && (
              <span className="text-sm text-red-500">{errors.card}</span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={login}
            className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
          >
            Upload
          </button>
        </form>

      
      </div>
    </div>
    </>
  );
};

export default GetPayment;