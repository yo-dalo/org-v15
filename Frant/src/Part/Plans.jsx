import React,{useState,useEffect} from 'react'
import { Link,useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';
import { Autoplay, Pagination, Navigation ,Scrollbar,Virtual} from 'swiper/modules';

import axios from "axios";



const Plans = () => {
    const [data, setData] = useState([]);
const navigate = useNavigate();
  const login = ()=>{
        axios.get("api/show/plans")
            .then((response) => {
                setData(response.data.results)
                
                
                console.log(response.data.results);
            })
            .catch((error) => {
                console.log(error.data);
                
            });
}
  
  
  
  
  
  const [isMobile, setIsMobile] = useState(false);
useEffect(() => {
  login()
    setIsMobile(window.innerWidth <= 768);
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
}, []);
  
  
  
  
  
  return (
    <div id="plains">
    <div className="sm:flex sm:flex-col sm:align-center p-10">

    <div className="relative self-center bg-slate-200 rounded-lg p-0.5 flex">

        <button type="button"
            className="relative w-1/2 rounded-md py-2 text-sm font-medium whitespace-nowrap focus:outline-none sm:w-auto sm:px-8 bg-slate-50 border-slate-50 text-slate-900 shadow-sm">Monthly
            billing
        </button>
        <button  type="button"
            className="ml-0.5 relative w-1/2 border rounded-md py-2 text-sm font-medium whitespace-nowrap focus:outline-none sm:w-auto sm:px-8 border-transparent text-slate-900">Yearly
            billing
        </button>
    </div>
    <div
        className="mt-12 flex max-ph:grid  space-y-3 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 md:max-w-5xl overflow-scroll md:mx-auto xl:grid-cols-3">
        
        
        
          <Swiper
        spaceBetween={30}
        //onSwiper={3}
        slidesPerView={isMobile?1:2}
        
        
        
        centeredSlides={true}
        virtual
        pagination={{
          clickable: true,
        }}
        navigation={true}
      modules={[Virtual, Navigation, Pagination]}
        className="mySwiper w-full h-full overflow-hidden"
      >
        
        
        
        {data.map((i,m)=>(
        
        <SwiperSlide key={i} className="border border-slate-200 rounded-lg shadow-sm divide-y  divide-slate-200">
            <div className="p-6">
                <h2 className="text-xl leading-6 font-bold text-slate-900">{i.PlanName}</h2>
                <p className="mt-2 text-base text-slate-700 leading-tight"> {i.PlanInformation}
                    idea.</p>
                <p className="mt-8">
                    <span className="text-4xl font-bold text-slate-900 tracking-tighter">₹{i.PlanReturnPrice}</span>

                    <span className="text-base font-medium text-slate-500">/mo</span>
                </p><Link to={`/payment/${i.PlanId}`}
                    className="mt-8 block w-full bg-slate-900 rounded-md py-2 text-sm font-semibold text-white text-center">Join
                    as a Starter</Link>
            </div>
            <div className="pt-6 pb-8 px-6">
                <h3 className="text-sm font-bold text-slate-900 tracking-wide uppercase">What's included</h3>
                <ul role="list" className="mt-4 space-y-3">
                    <li className="flex space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 h-5 w-5 text-green-400" width="24"
                            height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M5 12l5 5l10 -10"></path>
                        </svg>
                        <span className="text-base text-slate-700">1 landing page included</span>
                    </li>
                    <li className="flex space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 h-5 w-5 text-green-400" width="24"
                            height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M5 12l5 5l10 -10"></path>
                        </svg>
                        <span className="text-base text-slate-700">1,000 visits/mo</span>
                    </li>
                    <li className="flex space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 h-5 w-5 text-green-400" width="24"
                            height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M5 12l5 5l10 -10"></path>
                        </svg>
                        <span className="text-base text-slate-700">Access to all UI blocks</span>
                    </li>
                    <li className="flex space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 h-5 w-5 text-green-400" width="24"
                            height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M5 12l5 5l10 -10"></path>
                        </svg>
                        <span className="text-base text-slate-700">50 conversion actions included</span>
                    </li>
                    <li className="flex space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 h-5 w-5 text-green-400" width="24"
                            height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M5 12l5 5l10 -10"></path>
                        </svg>
                        <span className="text-base text-slate-700">5% payment commission</span>
                    </li>
                    <li className="flex space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 h-5 w-5 text-green-400" width="24"
                            height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M5 12l5 5l10 -10"></path>
                        </svg>
                        <span className="text-base text-slate-700">Real-time analytics</span>
                    </li>
                </ul>
            </div>
        </SwiperSlide>
        
        ))};
        
        
        </Swiper>
        
        
        
        
        
        
        
        
        
        
    </div>
</div>
    
    
    </div>
  )
}

export default Plans