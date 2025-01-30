import React, { useState, useContext ,useEffect} from 'react';
import { AuthContext } from '../Context';
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import { HiOutlineBars3 } from "react-icons/hi2";
const Nav = () => {
  const {setUserLogin,chack,userLogin,setLoGinData,loGinData,loGin} = useContext(AuthContext);
  const [nav_open, setNav_open] = useState(0);
  
  const navigate = useNavigate();
  
  
  
  useEffect(()=>{
    
    const chack1 = async () => {
            try {
                const response = await axios.get('/api/verify/user/cookia', { withCredentials: true });
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
    <div className="w-full px-5 flex justify-between items-center overflow-hidden h-16 my_font_1 bg-[#262626]">
    
    <div className="flex max-ph:gap-3 sm:gap-8 justify-center items-center">
    <HiOutlineBars3 onClick={()=> setNav_open(nav_open?0:1)} className="h-full text-white w-10" />
    <div className=" leading-0 font-bold flex flex-col  text-white">
    <h1 className=" leading-0 translate-y-2 bg-gradient-to-r text-xl to-[#D17F7B]  from-purple-500 via-[#8A5C7D] bg-clip-text text-transparent whitespace-nowrap">Ladli Laxami yojna </h1>
    <h3 className=" leading-0  bg-gradient-to-t text-xs from-[#F2B449] via-[#8A5C7D] to-[#F2B449] bg-clip-text text-transparent">orgnaijtion</h3>
    </div>
    </div>
    <Link to="/Profile" style={{display:userLogin.login?"block":"none"}} className="text-white   max-ph:translate-x-5 ">Login by {loGinData?.name}</Link>
 {  !userLogin.login && <Link to="/login" className="text-white ">Login</Link>}
    {/*drop*/}
    <div style={{display:nav_open?"block":"none",X:"44vw"}}  onClick={()=> setNav_open(nav_open?0:1)}  className="backdrop-blur-2xl duration-100 bg-[#2626262] w-screen w-1/2 h-screen  fixed top-0 left-0 z-50 ">
    <div className="w-[60%] h-screen   fixed top-0 left-0 z-50 bg-[#262626]">
    
        <div className="p-5 md:px-28 sm:w-2/12 pt-20 border-r">
            <div className="text-sm text-white uppercase tx_color_1 font-bold">Menu</div>
            <ul>
                <li className="my-2 text-white">
                    <Link className="hover:tx_color_1 text-white" to="/">Home</Link>
                </li>
                <li className="my-2">
                    <Link className="hover:tx_color_1 text-white" to="/Login">{!userLogin.login?"login":"logout"}</Link>
                </li>
                <li className="my-2">
                    <Link className="hover:text-[#8A5C7D] text-white" to="/About">About</Link>
                </li>
                <li className="my-2">
                    <Link className="hover:tx_color_1 text-white" to="/PrivacyPolicy">PrivacyPolicy</Link>
                </li>
            </ul>
        </div>
    
    
    </div>
    
    
    </div>
    
    
    
    
    </div>
  )
}

export default Nav