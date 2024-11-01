import React, { useState } from 'react'
import Navbar from './Navbar'
import {useForm} from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'
import axios from 'axios'; 
import GridLoader from 'react-spinners/GridLoader'
import { baseUrl } from '../util/apis'

function Signup() {

	const navigate = useNavigate()
	const dispatch = useDispatch()
  const [loading , setloading] = useState(false)
	const [error , setError] = useState("")
	const {register, handleSubmit} = useForm()

	const submitbutton = async (data)=>{
		try {
      setloading(true)
			const response =await axios.post(`${baseUrl}/user/signup`, data , {withCredentials : true})
			try {
        dispatch(login({ userData: response.data.data }));
        dispatch(fetchcart(response.data.data._id));
        setloading(false)
				navigate("/")
			} catch (error) {
        setloading(false)
        reset()
				console.log("error in dispatch" , error);
			}
		} catch (error) {
      setloading(false)
			setError("user already exist" , error)
		}
	}

  return (
	<>
	{/* <Navbar/> */}
  {
    loading ? ( <div className="flex w-full h-[100vh] m-auto items-center justify-center">
    <GridLoader color="#36d7b7" />
  </div>) : (
	<section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
   
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Create and account
        </h1>
        <form onSubmit={handleSubmit(submitbutton)} className="space-y-4 md:space-y-6" >
          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
             username
            </label>
            <input
              type="text"
			  name='username'
			  id='username'
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@company.com"
             
			  {...register("username", {
				required: true,
			})}
            />
          </div>

		  <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@gmail.com"
             
			  {...register("email", {
				required: true,
			})}
            />
          </div>

		  <div>
            <label
              htmlFor="fullName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
             fullName
            </label>
            <input
              type="fullName"
              name="fullName"
              id="fullName"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
             
			  {...register("fullName", {
				required: true,
			})}
            />
          </div>


          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              
			  {...register("password", {
				required: true,
			})}
            />
          </div>
        
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                aria-describedby="terms"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                
              />
            </div>
            <div className="ml-3 text-sm">
              <label
                htmlFor="terms"
                className="font-light text-gray-500 dark:text-gray-300"
              >
                I accept the{" "}
                <a
                  className="font-medium text-blue-600 hover:underline dark:text-primary-500"
                  href="#"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>
          </div>
          <button
		  
            type="submit"
            className="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create an account
          </button>
		  <p className='text-red-600'>{error}</p>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  </div>
</section>
  )
  }


	</>
  )
}

export default Signup