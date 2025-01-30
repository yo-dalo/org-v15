import React, { useState, useContext ,useEffect} from 'react';
import { AuthContext } from '../Context';
import Nav from "../Part/Nav"
import Nav2 from "../Part/Nav2"
import Footer from "../Part/Footer"
import PopeleSay from "../Part/PopeleSay"
import Addcomment from "../Part/Comment/Addcomment"
import { SlControlPlay } from "react-icons/sl";
import Loading from "../Part/Loading"
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Autoplay, Pagination, Navigation ,Scrollbar,Virtual} from 'swiper/modules';

import Plans from "../Part/Plans"
import Home_scoller from "../Part/Home_scoller"







const Home = () => {
  const { user ,auth_cookia,chack,userLogin} = useContext(AuthContext);
  
  
  
  
    useEffect(()=>{
      chack().then((e)=>{
      //  alert(e);
      }).catch((err)=>{
       // alert(err)
      })
  
  console.log(userLogin);
  
  
  
    },[])

  
  return (
    
    <div className="w-screen    h-screen max-ph:min-h-screen  bg-white  ">
    <Loading />
    
  
    <Nav2 />
    
    <Home_scoller />
    <div className="w-full max-ph:px-3 max-ph:min-h-[45vh]  px-28 flex gap-3.5 justify-center items-center h-60 ">
    <div className="w-4 rounded-2xl h-24 max-ph:h-40 bg-[#F2B449]"></div>
    <h1 className="text-3xl max-ph:text-2xl text-[#272B37] font-bold">"अपनी बेटी की शादी के लिए आज से रणनीतिक योजना और समझदारी से निवेश करके एक मजबूत वित्तीय नींव बनाएं।"</h1>
    </div>
    
    {/*        */}
    <div className="max-ph:px-3 max-ph:min-h-[150vh]  layout layout-2 px-28   pb-40 z-0 relative w-full h-1/2t  ">
            <div className="w-full h-80"><img className="w-full h-full object-cover "  src="/home-03-837x469.jpg"/></div>
            <div className="layout-content bg-100 animated fadeInUpBig" data-animate="{&quot;class&quot;:&quot;fadeInUpBig&quot;,&quot;delay&quot;:&quot;.2s&quot;}" style={{animationDelay: '0.2s'}}>
              <div className=" bg-[#D4D4D4]  px-3 ">
                <h2 className="   max-ph:text-2xl text-3xl font-bold   py-6">Laadli Laxmi Jeevan Yojana</h2>
                <p className="font-medium max-ph:text-sx  leading-6">"स्वागत है लाड़ली लक्ष्मी जीवन योजना में, एक सुरक्षित और लाभकारी निवेश योजना जो आपकी प्रिय बेटी के उज्जवल और समृद्ध भविष्य को सुनिश्चित करने के लिए बनाई गई है। यह अनोखी पहल आपको हर महीने थोड़ी सी राशि निवेश करने का अवसर देती है, जिससे उसकी शादी के खर्चों के लिए पर्याप्त लाभ प्राप्त किया जा सकता है।"</p>
                <div className="py-8 px-1 w-full gap-y-10 max-ph:gap-y-6 flex justify-start items-center flex-wrap ">
                <div className="max-w-full left-0 z-[-1] translate-y-20 absolute w-screen h-52 cg bg-amber-300"> </div>
                
                  <div className="max-ph:w-full  w-1/2 ">
                          {/* Blurb hover*/}
                          <div className="">
                            <div className="flex gap-3 justify-start items-center">
                             <div className=" text-3xl max-ph:text-2xl bg-white rounded-full flex justify-center items-center p-5"><SlControlPlay className="tx_color_1" /></div>
                              <div className="text-2xl max-ph:text-xl max-ph:w-52 w-36">Small Monthly Investments</div>
                            </div>
                          </div>
                  </div>
                  <div className="max-ph:w-full  w-1/2 ">
                          {/* Blurb hover*/}
                          <div className="">
                            <div className="flex gap-3 justify-start items-center">
                             <div className=" text-3xl max-ph:text-2xl bg-white rounded-full flex justify-center items-center p-5"><SlControlPlay className="tx_color_1" /></div>
                              <div className="text-2xl max-ph:text-xl max-ph:w-52 w-36">Flexible Tenure</div>
                            </div>
                          </div>
                  </div>
                  <div className="max-ph:w-full  w-1/2 ">
                          {/* Blurb hover*/}
                          <div className="">
                            <div className="flex gap-3 justify-start items-center">
                             <div className=" text-3xl max-ph:text-2xl bg-white rounded-full flex justify-center items-center p-5"><SlControlPlay className="tx_color_1" /></div>
                              <div className="text-2xl max-ph:text-xl max-ph:w-52 w-36">Secure and Risk-free</div>
                            </div>
                          </div>
                  </div>
                  <div className="max-ph:w-full  w-1/2 ">
                          {/* Blurb hover*/}
                          <div className="">
                            <div className="flex gap-3 justify-start items-center">
                             <div className=" text-3xl max-ph:text-2xl bg-white rounded-full flex justify-center items-center p-5"><SlControlPlay className="tx_color_1" /></div>
                              <div className="text-2xl max-ph:text-xl max-ph:w-52 w-36">Long-term Growth</div>
                            </div>
                          </div>
                  </div>
                  
                  
                  
                 
                </div>
              </div>
            </div>
          </div>
    {/*        */}
    

            <Plans />
            
    <div style={{display:"none"}} className="w-full  max-ph:min-h-full max-ph:px-0 max-ph:p-0 px-28 py-5 "> 
    <h1 className="text-center text-3xl font-bold py-5 ">Our Plans </h1>
    <div className="w-full max-ph:min-h-[20vw] h-[50vh]"> 
    
    
    {/* */}
    
    <Swiper
        spaceBetween={30}
        //onSwiper={3}
        slidesPerView={1.5}
        centeredSlides={true}
        
        
        
        virtual
        pagination={{
          clickable: true,
        }}
        navigation={true}
      modules={[Virtual, Navigation, Pagination]}
        className="mySwiper w-full h-full overflow-hidden"
      >
       
        <SwiperSlide className="w-full border-[0.5px] bg-indigo-400">Slide 8</SwiperSlide>
        <SwiperSlide className="w-full border-[0.5px] bg-amber-400">Slide 8</SwiperSlide>
        <SwiperSlide className="w-full border-[0.5px] bg-cyan-600 ">Slide 8</SwiperSlide>
        <SwiperSlide className="w-full border-[0.5px] bg-gray-400">Slide 8</SwiperSlide>

      </Swiper>
    {/* */}
    </div>
    </div>
    
    
  
    
   <PopeleSay />

    
    
    <div className="py-3"> 
    <hr>
    </hr>
    </div>
    <Addcomment className="px-5" />
    
    <Footer />
    
    
    </div>
  )
}
    

export default Home