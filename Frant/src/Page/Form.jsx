import Nav2 from "../Part/Nav2";
import Footer from "../Part/Footer";
import axios from "axios";
import {Link,useNavigate } from "react-router-dom";
import {myToast} from '../Toast';
import React, { useState, useContext ,useEffect} from 'react';
import { AuthContext } from '../Context';
const Form = () => {
  
    const {setLoading} = useContext(AuthContext);

  
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    AadhaarCardNumber: "",
    FamilyIdNumber: "",
    Village: "",
    RegistrationId: "",
  });

  const [img, setImg] = useState(null);
  const [familyIdImg, setFamilyIdImg] = useState(null);
  const [aadhaarFrontImg, setAadhaarFrontImg] = useState(null);
  const [aadhaarBackImg, setAadhaarBackImg] = useState(null);
  const [signature, setSignature] = useState(null);

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate the form
  const validate = () => {
    let newErrors = {};


    if (!formData.AadhaarCardNumber || formData.AadhaarCardNumber.length !== 12)
      newErrors.AadhaarCardNumber = "Aadhaar number must be 12 digits.";
    if (!formData.FamilyIdNumber) newErrors.FamilyIdNumber = "Family ID is required.";
    if (!formData.Village) newErrors.Village = "Village is required.";
    if (!formData.RegistrationId) newErrors.RegistrationId = "RegistrationId is required.";
    if (!img) newErrors.img = "Photo is required.";
    if (!aadhaarFrontImg) newErrors.aadhaarFrontImg = "Aadhaar front image is required.";
    if (!aadhaarBackImg) newErrors.aadhaarBackImg = "Aadhaar back image is required.";
    if (!familyIdImg) newErrors.familyIdImg = "Family ID image is required.";
    if (!signature) newErrors.signature = "Signature is required.";

    setErrors(newErrors);
    console.log(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
  // if (!validate()) return;
    const formDataObj = new FormData();
    
   formDataObj.append("AadhaarCardNumber", formData.AadhaarCardNumber);
   formDataObj.append("FamilyIdNumber", formData.FamilyIdNumber);
    formDataObj.append("Village", formData.Village);
    formDataObj.append("RegistrationId", formData.RegistrationId);
    formDataObj.append("Img", img);
   formDataObj.append("FamilyIdImg", familyIdImg);
    formDataObj.append("AadhaarFrontImg", aadhaarFrontImg);
    formDataObj.append("AadhaarBackImg", aadhaarBackImg);
   formDataObj.append("Signature", signature);
    
    
    
    
    
   // Cookies.set('authToken', 'uerid457', { expires: 7 }); 
   // if (!validate()) return;
setLoading(true)
    axios
      .post("/api/addUserDetails", formDataObj,
          {
    withCredentials: true, // Ensure cookies are sent
      headers: { 'Content-Type': 'multipart/form-data' },
    }
      )
      .then((response) => {
        //alert("Login successful!");
        myToast.success("Your details successful added")
      const data = response.data.record;
     setLoading(false) 

      })
      .catch((error) => {
        console.error("Error verifying OTP:", error);
        myToast.warn(error.response?.data?.error || "Error occurred");
        setLoading(false)
      });
  };
  
  
  
  

  return (
    <div className="min-h-screen gap-10 flex flex-col justify-center items-center ">
      <Nav2/>
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg ">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Book an Appointment</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* User ID */}

          {/* Aadhaar Card Number */}
          <div>
            <label htmlFor="AadhaarCardNumber" className="block text-sm font-medium text-gray-600 mb-1">
              Aadhaar Card Number
            </label>
            <input
              type="text"
              id="AadhaarCardNumber"
              name="AadhaarCardNumber"
              value={formData.AadhaarCardNumber}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${errors.AadhaarCardNumber ? "border-red-500" : "border-gray-300"} rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-300 focus:outline-none`}
            />
            {errors.AadhaarCardNumber && <p className="text-sm text-red-500">{errors.AadhaarCardNumber}</p>}
          </div>

          {/* Family ID Number */}
          <div>
            <label htmlFor="FamilyIdNumber" className="block text-sm font-medium text-gray-600 mb-1">
              Family ID Number
            </label>
            <input
              type="text"
              id="FamilyIdNumber"
              name="FamilyIdNumber"
              value={formData.FamilyIdNumber}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${errors.FamilyIdNumber ? "border-red-500" : "border-gray-300"} rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-300 focus:outline-none`}
            />
            {errors.FamilyIdNumber && <p className="text-sm text-red-500">{errors.FamilyIdNumber}</p>}
          </div>

          {/* Village */}
          <div>
            <label htmlFor="Village" className="block text-sm font-medium text-gray-600 mb-1">
              Village
            </label>
            <input
              type="text"
              id="Village"
              name="Village"
              value={formData.Village}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${errors.Village ? "border-red-500" : "border-gray-300"} rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-300 focus:outline-none`}
            />
            {errors.Village && <p className="text-sm text-red-500">{errors.Village}</p>}
          </div>

          {/* Registration ID */}
          <div>
            <label htmlFor="RegistrationId" className="block text-sm font-medium text-gray-600 mb-1">
              Registration ID
            </label>
            <input
              type="text"
              id="RegistrationId"
              name="RegistrationId"
              value={formData.RegistrationId}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${errors.RegistrationId ? "border-red-500" : "border-gray-300"} rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-300 focus:outline-none`}
            />
            {errors.RegistrationId && <p className="text-sm text-red-500">{errors.RegistrationId}</p>}
          </div>

          {/* File Uploads */}
          <div>
            <label htmlFor="Img" className="block text-sm font-medium text-gray-600 mb-1">
              Your Photo
            </label>
            <input
              type="file"
              id="Img"
              onChange={(e) => setImg(e.target.files[0])}
              className={`w-full px-4 py-2 border ${errors.img ? "border-red-500" : "border-gray-300"} rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-300 focus:outline-none`}
            />
            {errors.img && <p className="text-sm text-red-500">{errors.img}</p>}
          </div>

          <div>
            <label htmlFor="aadhaarFrontImg" className="block text-sm font-medium text-gray-600 mb-1">
              Aadhaar Front Image
            </label>
            <input
              type="file"
              id="aadhaarFrontImg"
              onChange={(e) => setAadhaarFrontImg(e.target.files[0])}
              className={`w-full px-4 py-2 border ${errors.aadhaarFrontImg ? "border-red-500" : "border-gray-300"} rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-300 focus:outline-none`}
            />
            {errors.aadhaarFrontImg && <p className="text-sm text-red-500">{errors.aadhaarFrontImg}</p>}
          </div>

          <div>
            <label htmlFor="aadhaarBackImg" className="block text-sm font-medium text-gray-600 mb-1">
              Aadhaar Back Image
            </label>
            <input
              type="file"
              id="aadhaarBackImg"
              onChange={(e) => setAadhaarBackImg(e.target.files[0])}
              className={`w-full px-4 py-2 border ${errors.aadhaarBackImg ? "border-red-500" : "border-gray-300"} rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-300 focus:outline-none`}
            />
            {errors.aadhaarBackImg && <p className="text-sm text-red-500">{errors.aadhaarBackImg}</p>}
          </div>

          <div>
            
            <label htmlFor="familyIdImg" className="block text-sm font-medium text-gray-600 mb-1">
              family Id Image
            </label>
            <input
              type="file"
              id="familyIdImg"
              onChange={(e) => setFamilyIdImg(e.target.files[0])}
              className={`w-full px-4 py-2 border ${errors.familyIdImg ? "border-red-500" : "border-gray-300"} rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-300 focus:outline-none`}
            />
            {errors.familyIdImg && <p className="text-sm text-red-500">{errors.familyIdImg}</p>}
          </div>
          <div>
            
            <label htmlFor="signature" className="block text-sm font-medium text-gray-600 mb-1">
              Signature
            </label>
            <input
              type="file"
              id="signature"
              onChange={(e) => setSignature(e.target.files[0])}
              className={`w-full px-4 py-2 border ${errors.signature ? "border-red-500" : "border-gray-300"} rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-300 focus:outline-none`}
            />
            {errors.signature && <p className="text-sm text-red-500">{errors.signature}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
          >
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Form;