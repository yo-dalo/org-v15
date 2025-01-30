import { useState ,useEffect,useContext} from 'react'
//import { Provider } from './Context';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { AuthContext } from './Context';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { ToastContainer } from 'react-toastify';
import './App.css'
import Home from './Page/Home'
import Login from './Page/Login'
import Form from './Page/Form'
import Ragistration from './Page/Ragistration'
import Admin_home from './Admin/Admin_home'
import Payment from './Page/Payment'
import Loading from './Part/Loading'
import Upload from './Page/Upload'
import Profile from './Page/Profile'
import PaymentInfo from './Page/PaymentInfo'
import About from './Page/About'
import PrivacyPolicy from './Page/PrivacyPolicy'
import Error404 from './Page/Error404'
import Comment from './Page/Comment'
import PaymentTest from './Page/PaymentTest'
import GetPayment from './Page/GetPayment'


function App() {
    const { user ,auth_cookia,chack,setUserLogin,userLogin,loGin,setLoGinData,} = useContext(AuthContext);

  
  
  
  
  
  
  return (
    <>
    <ToastContainer />
    <Loading />
        <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<Error404 />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/PaymentTest" element={<PaymentTest />} />
          <Route path="/Payment/:plansId/" element={<Payment />} />
          <Route path="/Form" element={<Form />} />
          <Route path="/PaymentInfo/:orderUd" element={<PaymentInfo />} />
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/comment" element={<Comment />} />
          <Route path="/About" element={<About />} />
          <Route path="/Upload" element={<Upload />} />
          <Route path="/Get" element={<GetPayment />} />
         <Route path="/Ragistration" element={<Ragistration />} /> 
         <Route path="/Admin" element={<Admin_home />} /> 
        </Routes>
    </Router>

    </>
  )
}

export default App
