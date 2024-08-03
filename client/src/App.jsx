import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { register, handleSubmit, reset } = useForm();
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]); // Only store the first file
    }
  };
  

  const formData = async (data) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:3000/api/upload', formData, );
      setMessage('File uploaded successfully');
      toast.success('File uploaded successfully');
      console.log('File URL:', response.data.url);
    } catch (error) {
      setMessage('File upload failed');
      toast.error('File upload failed');
      console.error(error);
    }

    reset();
  };

  return (
    <div className="w-full h-screen flex items-top justify-center text-white bg-black">
      <form
        onSubmit={handleSubmit(formData)}
        className="mt-10 w-full h-fit flex flex-col items-center justify-center"
      >
        <h1 className="text-5xl font-bold text-white">
          Uploading Specific files to Cloudinary
        </h1>
        <input
          {...register("Notes")}
          type="file"
          className="mt-16 cursor-pointer"
          accept=".pdf,.ppt,.pptx"
          onChange={handleFileChange}
        />
        <button className="w-96 shadow-md shadow-white bg-white text-black mt-12 h-10 text-2xl font-bold rounded-md">
          Submit
        </button>
        {message && <p className="mt-4">{message}</p>}
      </form>
    </div>
  );
}

export default App;
