import React, { useState, useContext ,useEffect} from 'react';
import { AuthContext } from '../Context';
import {myToast} from '../Toast';


import axios from "axios";
import Cookies from 'js-cookie';
import {Link ,useNavigate} from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const { user ,auth_cookia,chack,setUserLogin,userLogin,setLoGin,setLoading} = useContext(AuthContext);
  const [formData, setFormData] = useState({
    phone: "",
    otp: "",
  });
  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate phone number and OTP
  const validate = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number.";
      valid = false;
    }

    if (formData.otp && (formData.otp.length !== 6 || !/^\d{6}$/.test(formData.otp))) {
      newErrors.otp = "OTP must be a 6-digit number.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Send OTP
  const sendOtp = () => {
    if (!validate()) return;
    setLoading(true);

    axios
      .post(
        "/api/otp_1",
        { phone: formData.phone },
        { withCredentials: true }
      )
      .then((response) => {
        //alert(`OTP sent: ${response.data.otp}`);
        myToast.success("OTP sent success ")
       // console.log(response);
       setLoading(false);
        
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
       // alert(error.response?.data?.error || "Error occurred");
        myToast.error(error.response?.data?.error || "Error occurred");
        
      });
  };

  // Login with OTP
  const login = () => {
   // Cookies.set('authToken', 'uerid457', { expires: 7 }); 
    if (!validate()) return;
    setLoading(true);
    axios
      .post("/api/login/v2", formData, {
        withCredentials: true,
      })
      .then((response) => {
        //alert("Login successful!");
        setLoGin(true);
        myToast.success("Login successful!")
      const data = response.data.record;
      const userdata ={login:true,
          userId:data.UserId,
          userDetailId:data.DetailsId,
          userName:data.UserName,}
       setUserLogin({
          ...userLogin,
          login:true,
          userId:data.UserId,
          userDetailId:data.DetailsId,
          userName:data.UserName,
        })
        //console.log(response.data.record);
    localStorage.setItem('userLogin', JSON.stringify(userdata));
    setLoading(false);
    navigate("/");
      })
      .catch((error) => {
        console.error("Error verifying OTP:", error);
        setLoading(false);
       // alert(error.response?.data?.error || "Error occurred");
        myToast.warn(error.response?.data?.error || "Error occurred")
      });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-100 to-blue-300">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Welcome Back
        </h2>
        <p className="text-sm text-center text-gray-500 mb-4">
          Please login with your phone number and OTP.
        </p>

        <form>
          {/* Phone Number */}
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Phone Number
            </label>
            <input
              type="number"
              max="7"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              id="phone"
              placeholder="Enter your phone number"
              className={`w-full px-4 py-2 border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              } rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-300 focus:outline-none`}
            />
            {errors.phone && (
              <span className="text-sm text-red-500">{errors.phone}</span>
            )}
          </div>

          {/* OTP */}
          <div className="mb-4">
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              OTP (One-Time Password)
            </label>
            <div className="flex">
              <input
                type="number"
                maxLength="6"
                min="0"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                id="otp"
                placeholder="Enter OTP"
                className={`w-full px-4 py-2 border ${
                  errors.otp ? "border-red-500" : "border-gray-300"
                } rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-300 focus:outline-none`}
              />
              <button
                type="button"
                onClick={sendOtp}
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
              >
                Send OTP
              </button>
            </div>
            {errors.otp && (
              <span className="text-sm text-red-500">{errors.otp}</span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={login}
            className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link
            to="/Ragistration"
            className="text-blue-500 hover:underline focus:outline-none"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;