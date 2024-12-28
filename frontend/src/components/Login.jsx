import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login, setloadingfalse, setloadingtrue } from '../reducers/userReducer'
import GridLoader from "react-spinners/GridLoader";
import Navbar from './Navbar'
import axios from 'axios'
import { fetchcart } from '../reducers/CartReducer'
import { baseUrl } from '../util/apis'

function Login() {
  
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [error , setError] = useState("")
  const loading = useSelector((state)=>state.user.loading)
	const {register, handleSubmit , reset} = useForm()


	const submitbutton = async (data)=>{
		try {
     dispatch(setloadingtrue())
			const response =await axios.post(`${baseUrl}/user/login` , data , { withCredentials: true} )
    
      dispatch(fetchcart(response.data.data._id));
			try {
        dispatch(login({ userData: response.data.data }));
        dispatch(setloadingfalse())
				navigate("/")
			} catch (error) {
        reset()
				console.log("error in dispatch" , error);
			}
		} catch (error) {
      dispatch(setloadingfalse())
      console.log(error);
			setError("user not found")
		}
	}

  return (
<>
{/* <Navbar/> */}
{loading ? (
        <>
          <div className="flex w-full h-[100vh] m-auto items-center justify-center">
            <GridLoader color="#36d7b7" />
          </div>
        </>
      ) : 
      (
        <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
   
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Login and Enjoy
        </h1>
        <form onSubmit={handleSubmit(submitbutton)} className="space-y-4 md:space-y-6" >
         

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
          </div>
          <button
		  
            type="submit"
            className="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
           Login
          </button>
		  <p className='text-red-600'>{error}</p>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
           create new account {" "}
            <Link
              to="/signup"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              signup here
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

export default Login