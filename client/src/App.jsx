import React from "react";
import { useForm } from "react-hook-form";
// import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const { register, handleSubmit, reset } = useForm();
  const formData = (data) => {
    const file = data.Notes[0];
    if (file) {
      console.log("File name:", file.name);
    }
    toast.success("Form Submitted Successfully");
    console.log(data);
    reset();
  };
  return (
    <div className="w-full h-screen flex items-top justify-center text-white bg-black">
      <form
        onSubmit={handleSubmit(formData)}
        className="mt-10 w-full h-fit flex flex-col items-center justify-center"
      >
        <h1 className="text-5xl font-bold text-white">
          Uploading Specfic files to Cloudinary
        </h1>
        <input
          {...register("Notes")}
          type="file"
          className="mt-16 cursor-pointer"
          accept=".pdf,.ppt,.pptx"
        />
        <button className="w-96 shadow-md shadow-white bg-white text-black mt-12 h-10 text-2xl font-bold rounded-md">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
