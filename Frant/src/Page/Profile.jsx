import Nav from "../Part/Nav"
import Footer from "../Part/Footer"
import axios from "axios";
import React, { useState, useContext ,useEffect} from 'react';
import { AuthContext } from '../Context';
const Profile = () => {
  const [data, setData] = useState({});
      const {setLoading} = useContext(AuthContext);

  
  
  useEffect(()=>{
      const login = () => {
setLoading(true)
    axios
      .get("/api/show/user/profile", {
        withCredentials: true,
      })
      .then((response) => {
       // alert("Login successful!");
      setData(response.data.message[0])
      setLoading(false)
        
      })
      .catch((error) => {
        console.error("Error verifying OTP:", error);
      });
  };
  login();
  
  
    },[])
  
  
  return (
    <div className="flex flex-col justify-between">
        <Nav />
     <div className="max-w-3xl h-fit flex-1 mx-auto bg-white shadow-md rounded-lg mt-8 p-6">
      {/* Header */}
      <header className="flex justify-between items-center border-b pb-4 mb-6">
        <h1 className="text-xl font-bold text-gray-700">User Profile </h1>
        <button className="text-sm text-red-500 hover:underline">Edit Registration Details</button>
      </header>

      {/* Profile Details */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="bg-gray-200 rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold text-gray-500">
          A
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-800">{data.UserName}</h2>
          <p className="text-sm text-gray-600">Reg. No: 10018594145</p>
        </div>
      </div>

      {/* Personal Details */}
      <div className="mb-6">
        <p className="text-gray-700">
          <span className="font-bold">Father's Name:</span> {data?.FatherName}
        </p>
        <p className="text-gray-700">
          <span className="font-bold">Mother's Name:</span> {data?.MotherName}
        </p>
        <p className="text-gray-700">
          <span className="font-bold">Mobile Number:</span> {data?.Phone}
        </p>
        <p className="text-gray-700">
          <span className="font-bold">Email ID:</span> {data?.Email}
        </p>
        <p className="text-gray-700">
          <span className="font-bold">Address:</span> {data?.Address}
        </p>
      </div>

      {/* Admission Certificate */}
      <div className="bg-blue-100 border border-blue-300 p-4 rounded-lg flex items-center justify-between">
        <div>
          <h3 className="text-blue-800 font-bold">My Purchase Plans</h3>
          <p className="text-sm text-blue-700">1 year plan 12-month subscription for exclusive deals and discounts (15th February 2025)</p>
        </div>
        <button className="text-sm text-blue-500 underline">View</button>
      </div>
    </div>

        <Footer />
    </div>
  )
}

export default Profile





   