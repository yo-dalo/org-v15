import React, { useState, useContext ,useEffect} from 'react';
import { AuthContext } from '../Context';
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from "axios";
import { Link } from "react-router-dom";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Autoplay, Pagination, Navigation ,} from 'swiper/modules';



const PopeleSay =()=>{
   const {setLoading ,loading} = useContext(AuthContext);
    const [data, setData] = useState([]);
  
  useEffect(()=>{
      const login = () => {
//setLoading(true)
    axios.get("/api/comments", {
        withCredentials: true,
      })
      .then((response) => {
       // alert("Login successful!");
      setData(response.data)
   //   setLoading(false)
        
      })
      .catch((error) => {
        console.error("Error verifying OTP:", error);
        //setLoading(false)
      });
  };
  login();
  
  
    },[setLoading])
  
  
  
  
  
return (
  
  <div className="max-ph:flex-col max-ph:h-auto  flex max-ph:gap-20 gap-3 py-12  cg w-full h-1/4t justify-start items-center"> 
    <div className="w-[40%]  max-ph:w-full max-ph:h-auto h-full flex flex-col   "> 
    <h1 className="text-2xl  text-white max-ph:py-0 py-4 w-fit  max-ph:text-2xl font-bold max-ph:pl-5 pl-28"> What Popele Say About Us</h1>
    <div className="my-4  h-[0.1px] bg-white scale-0 " >
    </div>
    <div className="pl-28 max-ph:pl-5 max-ph:mt-1 mt-4"> 
    <Link to="/comment" className=" border-[1px] border-white inline px-11 py-5 text-white  rounded-full font-bold text-xs"> Shew More  </Link>
    </div>
  
    </div>
  
  
  
    
    
    <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoPlay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper   h-full  w-[60%] max-ph:w-full overflow-hidden flex"
      >
    { data.map((comment)=>(
      
        <SwiperSlide key={comment?.Id} className=" min-w-full pl-6 max-ph:p-0 pr-28 max-ph:px-5 max-ph:h-auto h-full">
         <h4 className="tx_color_1  font-medium text-xl pb-3"> {comment?.UserName}</h4>
    <p className="text-white text-xl  ">{comment?.CommentText}</p>
    
        </SwiperSlide>
        
        ))}
        

        
      </Swiper>
    
    
    
    
    
    
    
    
    </div>
    );
}

export default PopeleSay;