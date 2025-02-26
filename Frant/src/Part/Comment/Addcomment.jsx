import React, { useState, useContext ,useEffect} from 'react';
import { AuthContext } from '../../Context';


import axios from "axios"

const Addcomment = ({className}) => {
    const {setLoading} = useContext(AuthContext);

  
  const [data, setData] = useState("");
      const login = () => {
        if(!data) return;
setLoading(true)
    axios
      .post("http://localhost:5000/api/comments",{CommentText:data}, {
        withCredentials: true,
      })
      .then((response) => {
       //alert("Login successful!");
      setData("")
      setLoading(false)
        
      })
      .catch((error) => {
        setLoading(false)
        console.error("Error verifying OTP:", error);
      });
  };
  
  useEffect(()=>{
    
    
  
  
  
    },[])
  
  
  
  
  return (
                    <div className={`mb-4 my_font_1 ${className}`}>
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Comment 
                  </label>
                  <div className="relative ">
                    <textarea
                      type="text"
                      value={data}
                      onChange={(e)=>{setData(e.target.value)}}
                      placeholder="Enter your Comment"
                      className="w-full my_font_1 hover:outline-violet-400    outline-violet-800 rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-4">
                      <svg
                        className="fill-current"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.5">
                          <path
                            d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                            fill=""
                          />
                        </g>
                      </svg>
                    </span>
                  </div>
                  <button onClick={login} className="bg-indigo-400 rounded-xl my_font_1  float-right px-4 py-3">Add Your Comment</button>
                </div>
  )
}

export default Addcomment