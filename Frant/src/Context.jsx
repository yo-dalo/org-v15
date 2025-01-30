import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

// Create the context
export const AuthContext = createContext();

// Provide the context
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loGin, setLoGin] = useState(false);
  const [loGinData, setLoGinData] = useState({});
  const [loading, setLoading] = useState(false);
  const [delectcommeny, setDelectcommeny] = useState(0);
  
  
  
  
  
  const [auth_cookia, setAuth_cookia] = useState(Cookies.get("authToken"));
    const [localStoragedata, setLocalStoragedata] = useState(() => {
    // Load initial data from local storage
    const storedItems = localStorage.getItem("userLogin");
    return storedItems  ? JSON.parse(storedItems) : [];
  });
  
  const [userLogin, setUserLogin] = useState({
    login:localStoragedata.login||false,
    userId:localStoragedata.userId||null,
    userName:localStoragedata.userName||"",
    userDetailId:null
  });
  

  useEffect(() => {
    console.log(localStoragedata);
    chack()
    //alert(auth_cookia)
    //chackAuthCookia();
   // const cookies = Cookies.get(); // Get all cookies
    //setAuth_cookia(cookies?.authToken || null); // Set authToken if exists
    
    
  }, []);
  useEffect(() => {
    const authToken = Cookies.get("authToken");
    if(!authToken){
      localStorage.setItem("userLogin",JSON.stringify([]));
    }
  }, [auth_cookia]);

  const checkAuthCookie = () => {
    const authToken = Cookies.get("authToken");
    if (!authToken) {
      setUserLogin(false);
      alert("No authentication cookie found.");
    } else {
      alert("Authentication cookie found.")
    }
  };

const chack = async () => {
            try {
                const response = await axios.get('http://localhost:5000/verify/user/cookia', { withCredentials: true });
                setUser(response.data.user_id);
                setLoGinData(response.data)
            //  alert("fetchUser run")
              // console.log("fetchUser run",user)
            } catch (error) {
                setUser(null);
                return false;
                
            }
        };











  return (
    <AuthContext.Provider value={{ user, 
    auth_cookia, checkAuthCookie 
    ,chack,setUserLogin,
      userLogin,
      loGin,setLoGin,loGinData,setLoGinData,
      loading,setLoading,
      delectcommeny,setDelectcommeny,
      
    }}>
      {children}
    </AuthContext.Provider>
  );
};