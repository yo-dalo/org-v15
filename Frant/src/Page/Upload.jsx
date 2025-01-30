
import axios from "axios";


import React, { useState, useContext ,useEffect} from 'react';
import { AuthContext } from '../Context';


const Upload = () => {
  
  const [file, setFile] = useState(null);
  const [img, setImg] = useState(null);
  const [url, setUrl] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleFileChange1 = (e) => {
    setImg(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!file) {
      setError('Please provide both category name and an image file.');
      setLoading(false);
      return;
    }

    const formData = new FormData()
    formData.append('file', file);
    formData.append('img', img);

    try {
      const response = await axios.post('/api/poster', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess('Category added successfully!');
      console.log('Category added:', response.data);
      setTimeout(() => {
        // Redirect to /Category after success
      }, 100); // Add a 1-second delay before redirecting
    } catch (error) {
      setError('Error adding category.');
      console.error('Error adding category:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
    <form onSubmit={handleSubmit}>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    name="file"
                    id="file"
                    className="py-3 px-4 block w-full border-2 border-gray-400 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  />

                  <input
                    type="file"
                    onChange={handleFileChange1}
                    name="img"
                    id="file"
                    className="py-3 px-4 block w-full border-2 border-gray-400 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  />


              <div className="mt-6 grid">
                <button
                  type="submit"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                >hello
                </button>
              </div>
          </form>
    
    
    </div>
  )
}

export default Upload










