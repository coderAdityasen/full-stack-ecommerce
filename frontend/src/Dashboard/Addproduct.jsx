import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useForm } from "react-hook-form";
import GridLoader from "react-spinners/GridLoader";
import axios from "axios";
import Sidebar from "./Sidebar";

function Addproduct() {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setloading] = useState(false);
  const [error , setError] = useState("")
  const onSubmit = async (data) => {
    setloading(true)
    try {
      // Create FormData object to handle file upload
      const formData = new FormData();
      formData.append("image", data.image[0]); // Assuming 'image' is the name of your file input field
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("stock", data.stock);

      // Submit form data to the backend
      const response = await axios.post(
        "https://full-stack-ecommerce-api-jade.vercel.app/api/products/create",
        formData
      );
      console.log(response.data);
      setloading(false);
      reset();
      // Handle success
    } catch (error) {
      setloading(false)
      setError("plz fill all the details")
      console.error("Error submitting form:", error);
      // Handle error
    }
  };

  return (
    <>
      {loading ? (
        <>
          <div className="flex w-full h-[100vh] m-auto items-center justify-center">
            <GridLoader color="#36d7b7" />
          </div>
        </>
      ) : null}


<h1 className="text-red-500 text-center text-2xl font-semibold">{error}</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`w-full ${
          loading ? "hidden" : "xl:flex"
        }  gap-5 justify-between items-center my-10`}
      >
      
        <div className="flex items-center justify-center w-5/12 xl:ml-28">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-[60vh] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 "
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="https://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              {...register("image")}
            />
          </label>
        </div>
        <div className="w-6/12">
          <div className="max-w-sm xl:mx-20">
            <div className="mb-5">
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Product Title
              </label>
              <input
                {...register("title")}
                type="text"
                id="title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="iPhone 14 Pro"
                
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Product Description
              </label>
              <input
                {...register("description")}
                type="text"
                id="description"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Product Price
              </label>
              <input
                {...register("price")}
                type="number"
                id="price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="stock"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Product Stock
              </label>
              <input
                {...register("stock")}
                type="number"
                id="stock"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                
              />
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Addproduct;
