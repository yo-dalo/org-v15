import React from 'react'
import GetComment from "../Part/Comment/GetComment"
import Addcomment from "../Part/Comment/Addcomment"
import Nav2 from "../Part/Nav2"
import Footer from "../Part/Footer"
const Comment = () => {
  return (
    <div>
       <Nav2 />
    <Addcomment className="px-5 py-7" />
    <GetComment />
    
 <Footer />
    
    
    </div>
    
    
  )
}

export default Comment