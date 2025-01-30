import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';

import { Autoplay, Pagination, Navigation ,Scrollbar} from 'swiper/modules';



const RightSwiper = () => {
  return (
    <div className="w-full bg-amber-950 h-full">
    
        <Swiper 
    
    
    //onSlideChange={(e) => (setText(scrollertext[e.activeIndex]))}
    
    
    spaceBetween={30}
        direction={'horizontal'}
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
        <img className="w-full h-full object-contain" src="../home-02-727x930.jpg" />
        </SwiperSlide>
       
        <SwiperSlide className="w-full h-full bg-amber-300">
        <img className="object-cover w-full h-full" src="../Img/children-82272_1280.jpg" />
        </SwiperSlide>
       
        <SwiperSlide className="w-full h-full bg-amber-300">
        <img className="object-cover w-full h-full" src="../Img/istockphoto-1324689412-612x612.jpg" />
        </SwiperSlide>
       
       
      </Swiper>
    
    
    
    
    </div>
  )
}

export default RightSwiper