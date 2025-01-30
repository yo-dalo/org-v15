import React, { useState, useContext ,useEffect} from 'react';
import { AuthContext } from '../Context';
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import { HiOutlineBars3 } from "react-icons/hi2";
import Nav3 from "./Nav3";

const Nav2 = () => {
  const {setUserLogin,chack,userLogin,setLoGinData,loGinData,loGin} = useContext(AuthContext);
  const [nav_open, setNav_open] = useState(0);
  
  const navigate = useNavigate();
  
  
  
  useEffect(()=>{
    
    const chack1 = async () => {
            try {
                const response = await axios.get('http://localhost:5000/verify/user/cookia', { withCredentials: true });
               // setUser(response.data.user_id);
                setLoGinData(response.data)
            //  alert("fetchUser run")
              // console.log("fetchUser run",user)
            } catch (error) {
                //setUser(null);
                return false;
                
            }
        };
   // alert(555)
    chack1()
  },[])
  
  
  
  
  
  
  
  return (
    <>
    <div className="w-full max-ph:px-12 px-7 py-3 flex justify-between items-center max-ph:h-16 h-28 ">
    
    <div className="h-full flex gap-4 justify-center items-center"> 
       <img className="h-full max-ph:w-10 w-20" src="../Logo/Emblem_of_Haryana.svg.png" />
        <div className="h-full flex-col  leading-3 flex justify-center "> 
         <h3 className="">Ladli Laxami yojna  </h3>
         <Link to="/" className="text-3xl max-ph:text-xl max-ph:whitespace-nowrap font-bold ">Ladli Laxami yojna  </Link>
         </div>
    
    </div>

    
    
    
    
        <div className="h-full flex gap-7 max-ph:scale-0 justify-center items-center"> 
       <img className="h-full object-cover rounded-2xl w-20" src="../Img/nav/20240606210001100.png" />
       <img className="h-full object-cover rounded-2xl w-20" src="../Img/nav/IMG-20250123-WA0001.jpg" />
    </div>
    
    
    
    
    
    </div>
        <Nav3 />

    </>
  )
}

export default Nav2