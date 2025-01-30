import "../Css/Loading.css";
import React, { useState, useContext ,useEffect} from 'react';
import { AuthContext } from '../Context';
const Loading = () => {
    const {setLoading,loading} = useContext(AuthContext);

  return (
    <div style={{display:loading?"block":"none"}} className="w-screen  h-screen fixed z-[1000] pointer-events-none flex justify-center items-center top-0 left-0 backdrop-blur-sm">
    <div className="dot-spinner left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
    <div className="dot-spinner__dot"></div>
    <div className="dot-spinner__dot"></div>
    <div className="dot-spinner__dot"></div>
    <div className="dot-spinner__dot"></div>
    <div className="dot-spinner__dot"></div>
    <div className="dot-spinner__dot"></div>
    <div className="dot-spinner__dot"></div>
    <div className="dot-spinner__dot"></div>
</div>
    </div>
  )
}

export default Loading