
import axios from "axios";
import {Link ,useNavigate} from "react-router-dom";
import {myToast} from '../Toast';
import React, { useState, useContext ,useEffect} from 'react';
import { AuthContext } from '../Context';



const Registration = () => {

  const navigate = useNavigate();
      const {setLoading} = useContext(AuthContext);

  const [formData, setFormData] = useState({
    user_name: "",
    father_name: "",
    mother_name: "",
    dob: "",
    address: "",
    email: "",
    phone: "",
    district: "",
    state: "",
    pincode: "",
    age: "",
    otp: "",
    gender: "",
  });

  const [errors, setErrors] = useState({});
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};

    // User Name
    if (!formData.user_name.trim()) newErrors.user_name = "User Name is required.";
    
    // Father Name
    if (!formData.father_name.trim()) newErrors.father_name = "Father Name is required.";
    
    // Mother's Name
    if (!formData.mother_name.trim()) newErrors.mother_name = "Mother Name is required.";
    
    // Date of Birth
    if (!formData.dob) newErrors.dob = "Date of Birth is required.";
    
    // Address
    if (!formData.address.trim()) newErrors.address = "Address is required.";
    
    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address.";
    }
    
    // Phone Number
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits.";
    }

    // District
    if (!formData.district.trim()) newErrors.district = "District is required.";

    // State
    if (!formData.state.trim()) newErrors.state = "State is required.";
    
    // Pincode
    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required.";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Pincode must be 6 digits.";
    }
    
    // Age
    if (!formData.age.trim()) newErrors.age = "Age is required.";
    
    // Gender
    if (!formData.gender.trim()) newErrors.gender = "Gender is required.";

    // OTP (only if OTP was sent)
    if (isOtpSent && !formData.otp.trim()) newErrors.otp = "OTP is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
   setLoading(true)
    try {
      const response = await axios.post("/api/v1/register", formData);
      if (response.status === 200) {
        alert("User registered successfully!");
        myToast.success("User registered successfully!")
        setFormData({
          user_name: "",
          father_name: "",
          mother_name: "",
          dob: "",
          address: "",
          email: "",
          phone: "",
          district: "",
          state: "",
          pincode: "",
          age: "",
          otp: "",
          gender: "",
        });
        setIsOtpSent(false);
        setLoading(false)
        navigate('/Login');
      } else {
        alert(response.data.error || "Registration failed.");
        myToast.error(response.data.error || "Registration failed")
        setLoading(false)
      }
    } catch (error) {
      console.error("Error:", error);
     myToast.warn(error.response.data.error)
     setLoading(false)

      //alert(error.response.data.error);
    }
  };

  const sendOtp = async () => {
    
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone)) {
      setErrors({ ...errors, phone: "Please enter a valid 10-digit phone number." });
      return;
    }
setLoading(true);

    try {
      const response = await axios.post("/api/otp_1", { phone: formData.phone });
      if (response.status === 200) {
       // alert("OTP sent successfully!");
        myToast.success("OTP sent successfully!")
        setIsOtpSent(true);
        setLoading(false)
      } else {
        //alert(response.data.error || "Failed to send OTP.");
        myToast.warn(response.data.error || "Failed to send OTP.")
        setLoading(false)
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false)
      //alert("An unexpected error occurred.");
      myToast.error("An unexpected error occurred.")

    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-100 py-10 to-blue-300">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
          Register Here
        </h2>
        <p className="text-sm text-center text-gray-500 mb-4">
          Please fill out the form to create an account.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* User Name */}
          <div className="mb-4">
            <label htmlFor="user_name" className="block text-sm font-medium text-gray-600 mb-1">
              User Name
            </label>
            <input
              type="text"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${errors.user_name ? "border-red-500" : "border-gray-300"} rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-300 focus:outline-none`}
              placeholder="Enter your user name"
            />
            {errors.user_name && <span className="text-sm text-red-500">{errors.user_name}</span>}
          </div>

          {/* Father's Name */}
          <div className="mb-4">
            <label htmlFor="father_name" className="block text-sm font-medium text-gray-600 mb-1">
              Father Name
            </label>
            <input
              type="text"
              name="father_name"
              value={formData.father_name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${errors.father_name ? "border-red-500" : "border-gray-300"} rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-300 focus:outline-none`}
              placeholder="Enter your father's name"
            />
            {errors.father_name && <span className="text-sm text-red-500">{errors.father_name}</span>}
          </div>

          {/* Mother's Name */}
          <div className="mb-4">
            <label htmlFor="mother_name" className="block text-sm font-medium text-gray-600 mb-1">
              Mother's Name
            </label>
            <input
              type="text"
              name="mother_name"
              value={formData.mother_name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${errors.mother_name ? "border-red-500" : "border-gray-300"} rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-300 focus:outline-none`}
              placeholder="Enter your mother's name"
            />
            {errors.mother_name && <span className="text-sm text-red-500">{errors.mother_name}</span>}
          </div>

          {/* Date of Birth */}
          <div className="mb-4">
            <label htmlFor="dob" className="block text-sm font-medium text-gray-600 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${errors.dob ? "border-red-500" : "border-gray-300"} rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-300 focus:outline-none`}
            />
            {errors.dob && <span className="text-sm text-red-500">{errors.dob}</span>}
          </div>

          {/* Address */}
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium text-gray-600 mb-1">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${errors.address ? "border-red-500" : "border-gray-300"} rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-300 focus:outline-none`}
              placeholder="Enter your address"
            />
            {errors.address && <span className="text-sm text-red-500">{errors.address}</span>}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-300 focus:outline-none`}
              placeholder="Enter your email"
            />
            {errors.email && <span className="text-sm text-red-500">{errors.email}</span>}
          </div>

          {/* Phone Number */}
          <div className="mb-4 flex items-center">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`flex-1 border px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-indigo-200 ${errors.phone ? "border-red-500" : ""}`}
              placeholder="Phone Number"
            />
            <button
              type="button"
              onClick={sendOtp}
              className="ml-4 bg-indigo-500 text-white px-4 py-2 rounded-md focus:outline-none"
            >
              Send OTP
            </button>
          </div>
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

          {/* OTP */}
          <div className="mb-4">
            <input
              type="number"
              name="otp"
              min="0"
              value={formData.otp}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${errors.otp ? "border-red-500" : "border-gray-300"} rounded-md focus:ring-2 focus:ring-indigo-300`}
              placeholder="Enter OTP"
            />
            {errors.otp && <p className="text-red-500 text-sm">{errors.otp}</p>}
          </div>

          {/* District */}
          <div className="mb-4">
            <label htmlFor="district" className="block text-sm font-medium text-gray-600 mb-1">
              District
            </label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${errors.district ? "border-red-500" : "border-gray-300"} rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-300 focus:outline-none`}
              placeholder="Enter your district"
            />
            {errors.district && <span className="text-sm text-red-500">{errors.district}</span>}
          </div>

          {/* State */}
          <div className="mb-4">
            <label htmlFor="state" className="block text-sm font-medium text-gray-600 mb-1">
              State
              </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${errors.state ? "border-red-500" : "border-gray-300"} rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-300 focus:outline-none`}
              placeholder="Enter your state"
            />
            {errors.state && <span className="text-sm text-red-500">{errors.state}</span>}
          </div>

          {/* Pincode */}
          <div className="mb-4">
            <label htmlFor="pincode" className="block text-sm font-medium text-gray-600 mb-1">
              Pincode
            </label>
            <input
              type="number"
              name="pincode"
              min="0"
              value={formData.pincode}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${errors.pincode ? "border-red-500" : "border-gray-300"} rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-300 focus:outline-none`}
              placeholder="Enter your pincode"
            />
            {errors.pincode && <span className="text-sm text-red-500">{errors.pincode}</span>}
          </div>

          {/* Age */}
          <div className="mb-4">
            <label htmlFor="age" className="block text-sm font-medium text-gray-600 mb-1">
              Age
            </label>
            <input
              type="number"
              name="age"
              max="30"
              min="0"
              value={formData.age}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${errors.age ? "border-red-500" : "border-gray-300"} rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-300 focus:outline-none`}
              placeholder="Enter your age"
            />
            {errors.age && <span className="text-sm text-red-500">{errors.age}</span>}
          </div>

          {/* Gender */}
          <div className="mb-4">
            <label htmlFor="gender" className="block text-sm font-medium text-gray-600 mb-1">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${errors.gender ? "border-red-500" : "border-gray-300"} rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-300 focus:outline-none`}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <span className="text-sm text-red-500">{errors.gender}</span>}
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg focus:outline-none hover:bg-indigo-700"
            >
              Register
            </button>
          </div>
        </form>
        
        
                <p className="text-center text-sm text-gray-500 mt-6">
          I have an account?{" "}
          <Link
            to="/Login"
            className="text-blue-500 hover:underline focus:outline-none"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;