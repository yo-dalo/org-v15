import React, { useState,useRef, useContext ,useEffect} from 'react';
import { AuthContext } from '../Context';
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';

import RightSwiper from "./RightSwiper"

import { SlControlPlay } from "react-icons/sl";
import { IoIosHeartEmpty } from "react-icons/io";
import { TfiComment } from "react-icons/tfi";
import { GoHeart } from "react-icons/go";
//#272B37
import { Autoplay, Pagination, Navigation ,Scrollbar} from 'swiper/modules';
const Home_scoller = () => {
  const { user ,auth_cookia,chack,userLogin} = useContext(AuthContext);

const [scrollertext, setScrollertext] = useState([
  
  "बेटी की शादी में चिंता को अलविदा कहें",
  "बेटी की खुशियां, हमारी प्राथमिकता।",
  "लाड़ली लक्ष्मी योजना – बेटी की शादी के हर खर्चे का समाधान।",
  ]);
  const [text, setText] = useState("Secure Future for Daughter’s Marriage");






  return (
    <div className="  lp:bg-amber-600    max-ph:min-h-screen max-ph:h-[110vh]  max-ph:flex-col    w-full my-font flex justify-self-center items-center h-1/3t h-[40vh]     bg-fuchsia-50">
    <div className=" max-ph:min-h-[50vh] relative   bg-cyan-400 w-full overflow-hidden flex-1 h-full ">
    
    
        <div className="absolute text-amber-400 z-40 max-ph:top-20 top-10 left-6"> 
        <h1 className=" max-ph:text-4xl w-[60%]  text-4xl max-ph:w-[80%] text-white font-bold mb-8"> {text}</h1>
        <div className="inline py-4 text-xs rounded-full font-bold  bg_color_1 text-white  px-10"> 
        <Link to={userLogin.login?userLogin.userDetailId?"#plains":"/Ragistration":"/Login"}> JOIN NOW </Link>
        </div>
        
        </div>
    
    <Swiper 
    
    
    onSlideChange={(e) => (setText(scrollertext[e.activeIndex]))}
    
    
    spaceBetween={30}
        direction={'vertical'}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
    
    
    
        
        className="mySwiper flex w-full h-full bg-amber-300"
      >
        <SwiperSlide className="w-full flex justify-center items-center relative h-full bg-amber-300">
        <img className="w-full h-full" src="../home-02-727x930.jpg" />
        </SwiperSlide>
       
        <SwiperSlide className="w-full h-full bg-amber-300">
        <img className="object-cover w-full h-full" src="../Img/children-82272_1280.jpg" />
        </SwiperSlide>
       
        <SwiperSlide className="w-full h-full bg-amber-300">
        <img className="object-cover w-full h-full" src="../Img/istockphoto-1324689412-612x612.jpg" />
        </SwiperSlide>
       
       
      </Swiper>
    
    
    </div>
    
    
    
    
    
    
    
    
    <div className=" max-ph:w-full max-ph:min-h-fit  h-full cg gap-4 flex flex-col w-[40%]">
   
     <RightSwiper />


    </div>
    
    
    
    
    </div>
  )
}

export default Home_scoller