import {
  useState,useEffect,useContext
} from 'react'
import Nav2 from "../Part/Nav2";
import axios from "axios"
import { AuthContext } from '../Context';
import {myToast} from '../Toast';
import {
  load
} from '@cashfreepayments/cashfree-js'
import {Link,useParams, useNavigate} from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Autoplay, Pagination, Navigation ,Scrollbar,Virtual} from 'swiper/modules';

import Footer from "../Part/Footer"


function Payment() {
  const { plansId } = useParams()
      const {setLoading} = useContext(AuthContext);
    const {setUserLogin,userLogin} = useContext(AuthContext);
const navigate = useNavigate();
  
  
    const [data,setData] = useState([1]);
    const [errrr,seterrrr] = useState(null);
  let cashfree;

    const initCashfree = async () => {
        cashfree = await load({ mode: "sandbox" });
    };
    initCashfree();

  
  const [orderIddd,setOrderIddd] = useState("");
  const [paymentId,setPaymentId] = useState("");
  const [chackExistedPlans,setChackExistedPlans] = useState(false);
    const getSessionId = async () => {
    try {
      let res = await axios.post("/api/payment/test/v4",{plansId},{ withCredentials: true });
      if (res.data && res.data.payment_session_id) {
       console.log(res.data.order_id);
     await setOrderIddd(res.data.order_id);
      await setPaymentId(res.data.cf_payment_id);
       
        return res.data.payment_session_id ;


       
      }
    } catch (error) {
      console.log(error.response.data.message)
      seterrrr(error.response.data.message);
      myToast.info(error.response.data.message)
      
    };
  };
  
  
  
  
  
  
  
  
  const verifyPayment = async (odId,pyId) => {
    try {
      let res = await axios.post("http://localhost:5000/verify4", {
        orderIddd: odId,
        paymentId:pyId
      },{ withCredentials: true });
      if (res && res.data) {
        alert("payment verified")
        
      }} catch (error) {
      console.log(error)
    }};
    
  const handleClick = async (e) => {
    e.preventDefault();
    try {
        let sessionId = await getSessionId();
        console.log(sessionId);
        if (!sessionId) return;  // Corrected condition
        let checkoutOptions = {
            paymentSessionId: sessionId,
            redirectTarget: "_modal",
        };
        cashfree.checkout(checkoutOptions).then((res) => {
            console.log("payment initialized");
            verifyPayment(orderIddd,paymentId);
        });
    } catch (error) {
        console.log(error);
    }
};








    
    {/*   */}
    const getplansdetails = (plansId)=>{
        axios.get(`/api/show/plans/${plansId}`,{ withCredentials: true })
            .then((response) => {
                setData([response.data.result])
                console.log(response.data.result);
            })
            .catch((error) => {
                console.log(error.data);
                
            });
}
    
    useEffect(() => {
    getplansdetails(plansId);
}, [plansId]);
    
    
  return (
    <>
    <Nav2 />
 {data.map((i,r)=>(
    <div key={r+1} className="max-ph:flex-col-reverse max-ph:h-auto  flex max-ph:gap-20 gap-3 py-12  cg w-full h-1/4t justify-start items-center"> 
    <div className="w-[40%]  max-ph:w-full max-ph:h-auto h-full flex flex-col   "> 
    <h1 className="text-2xl  text-white max-ph:py-0 py-4 w-fit  max-ph:text-2xl font-bold max-ph:pl-5 pl-28"> Pay ₹{i?.PlanFee} for {i?.PlanDuration}-Year Plan Registration </h1>
    <div className="my-4  h-[0.1px] bg-white scale-0 " >
    </div>
    <div className="pl-28 max-ph:pl-5 max-ph:mt-1 mt-4"> 
    <h3 onClick={handleClick} className=" border-[1px] border-white inline px-11 py-5 text-white  rounded-full font-bold text-xs"> payNav </h3>
    </div>
  
    </div>
    
    <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[ Pagination, Navigation]}
        className="mySwiper   h-full  w-[60%] max-ph:w-full overflow-hidden flex"
      >
        <SwiperSlide className=" min-w-full pl-6 max-ph:p-0 pr-28 max-ph:px-5 max-ph:h-auto h-full">
         <h4 className="tx_color_1  font-medium text-xl pb-3"> Payment  Details </h4>
         
    <p class="text-white text-xl  ">
    <li>Name : {i?.name}</li>
    <li>Prize Money: ₹{i?.PlanReturnPrice}</li>
    <li>Plan Duration: {i?.PlanDuration} Years</li>
    <li>Total Registration Fee: ₹{i?.PlanFee}</li>
    <li className="text-blue-800 pt-14">फॉर्म भरते समय फॉर्म शुल्क 100 रुपये से अधिक न लें।</li>
    
    
    </p>
    
        </SwiperSlide>
        
        
        
        <SwiperSlide className="max-w-[100vw] min-w-full pl-6 max-ph:p-0 pr-28 max-ph:px-5 max-ph:h-auto h-full">
         <h4 className="tx_color_1  font-medium text-xl pb-3">Important information  </h4>
    <p class="text-white text-xl  ">
    योजना खरीदने के बाद 24 घंटे में आपकी दस्तावेज़ जांच होगी। स्वीकृति मिलने पर आपको पंजीकरण नंबर और रसीद दी जाएगी। यदि स्वीकृति नहीं मिली, तो पैसे वापस कर दिए जाएंगे।

    </p>
    
        </SwiperSlide>
        
        
        
        
        
        <SwiperSlide className="max-w-[100vw] min-w-full pl-6 max-ph:p-0 pr-28 max-ph:px-5 max-ph:h-auto h-full">
         <h4 className="tx_color_1  font-medium text-xl pb-3"> Important information</h4>
    <p class="text-white text-xl  ">
  
  {i?.PlanDuration} साल के इस इन्वेस्टमेंट प्लान का शुल्क ₹ {i?.PlanFee} है। इस प्लान को लेने पर आपको {i?.PlanDuration} साल के बाद ₹{i?.PlanReturnPrice} की राशि प्राप्त होगी। इस योजना का लाभ उठाने के लिए आपको अपनी शादी का कार्ड या कुआं पूजन का कार्ड अपलोड करना अनिवार्य होगा। यदि आपकी शादी इस प्लान की अवधि के बीच में होती है, तो आपको यह राशि प्लान की अवधि खत्म होने के बाद प्रदान की जाएगी। यह प्लान आपके भविष्य को सुरक्षित करने और वित्तीय स्थिरता प्रदान करने के लिए एक बेहतरीन विकल्प है।
  
    </p>
    
        </SwiperSlide>
        
        
        
      </Swiper>
    
    
    
    
    
    
    
    
    </div>
    
    
   ))}


        <Footer />
    
    < />
  )
}export default Payment