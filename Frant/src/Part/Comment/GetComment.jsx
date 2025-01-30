import React, { useState, useContext ,useEffect} from 'react';
import { AuthContext } from '../../Context';

import Addcomment from "../Comment/Addcomment"
import DeleteComment from "../Comment/DeleteComment"
import axios from "axios";

const GetComment = () => {
  const {setLoading ,loading} = useContext(AuthContext);
    const [data, setData] = useState([]);

    

  useEffect(()=>{
      const login = () => {
//setLoading(true)
    axios
      .get("http://localhost:5000/api/comments", {
        withCredentials: true,
      })
      .then((response) => {
       // alert("Login successful!");
      setData(response.data)
      //setLoading(false)
        
      })
      .catch((error) => {
        console.error("Error verifying OTP:", error);
      });
  };
  login();
  
  
    },[setLoading,loading])
  
  
  
  
  return (
    <div>
  {/*<Addcomment className="px-5" />*/}
    
     <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Comments</h2>

      {/* Comment Input Section */}
      {/*
      <div className="flex items-start space-x-4 mb-6">
        <div className="w-10 h-10 flex items-center justify-center bg-gray-300 rounded-full text-xl font-semibold text-white">
          G
        </div>
        <div className="flex-1">
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows="3"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button
            onClick={handleAddComment}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-all"
          >
            Comment
          </button>
        </div>
      </div>
*/}
      {/* Comments List */}
      <div className="space-y-6">
        {data.map((comment) => (
          <div key={comment.Id} className="flex items-start bg-indigo-50 border-blue-200 space-x-4">
            {/* User Avatar */}
            <div className="w-12 h-12 flex items-center justify-center bg-blue-500 text-white text-xl font-bold rounded-full">
              {comment.UserName.charAt(0)}
            </div>

            {/* Comment Content */}
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800">{comment.UserName}</h4>
              <p className="text-gray-700">{comment.CommentText}</p>
              <span className="text-gray-500 text-sm">{comment.CreatedAt}</span>
            </div>
        <DeleteComment id={comment.Id} />
          </div>
        ))}
      </div>
    </div>
    
    
    
    
    </div>
  )
}

export default GetComment