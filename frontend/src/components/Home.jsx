import React, { useEffect, useState } from 'react'
// import {Navbar} from './index'
import {Navbar} from './index';
import GridLoader from 'react-spinners/GridLoader';
import  carouselcard3  from "../assets/carouselcard3.jpg";
import  carouselcard  from "../assets/carouselcard.webp";
import  carouselcard2  from "../assets/carouselcard2.gif";
import slidesimg2 from "../assets/slidesimg2.gif";
import slidesimg from "../assets/slidesimg.gif";
import fullsleeve from "../assets/ourproducts/fullsleeve.webp";
import hoodie from "../assets/ourproducts/hoodie.webp";
import jeans from "../assets/ourproducts/jeans.webp";
import jogger from "../assets/ourproducts/jogger.webp";
import tshirt from "../assets/ourproducts/tshirt.webp";
import oversizedt from "../assets/ourproducts/oversizedt.webp";
import cargo from "../assets/hovercard/cargo.webp";
import download from "../assets/hovercard/download.webp";
import pants from "../assets/hovercard/pants.webp";
import tees from "../assets/hovercard/tees.webp";
import Footer from './Footer';

function Home() {
	const [loading , setloading] = useState(true)

	useEffect(()=>{
		setTimeout(() => {
			setloading(false)
		}, 300);
	} , [])

  return (
	<>
	<Navbar/>
	
	{loading  ? (
        <>
          <div className="flex w-full h-[100vh] m-auto items-center justify-center">
            <GridLoader color="#36d7b7" />
          </div>
        </>
      ) : 
	  (
		<>
		<div className='w-full flex gap-3 items-center justify-between overflow-scroll mt-3 '>
	<img className='' src={carouselcard2} alt="" />
	<img className='' src={carouselcard3} alt="" />
	<img className='' src={carouselcard} alt="" />
	
</div>

		<div className='w-full flex items-center justify-around mt-10'>
			<img className='' src={slidesimg} alt="" />
			<img className='' src={slidesimg2} alt="" />
		</div>


<h1 className='my-10 text-center text-3xl'>Explore Our Catoegory ✨</h1>

<div className='w-full h-auto flex '>
<img className='w-1/6 h-full object-cover' src={hoodie} alt="" />
  <img className='w-1/6 h-full object-cover' src={fullsleeve} alt="" />
  <img className='w-1/6 h-full object-cover' src={jeans} alt="" />
  <img className='w-1/6 h-full object-cover' src={jogger} alt="" />
  <img className='w-1/6 h-full object-cover' src={oversizedt} alt="" />
  <img className='w-1/6 h-full object-cover' src={tshirt} alt="" />
</div>

<h1 className='text-center text-3xl my-10'>SEASONAL FAVS COLLECTION ☀️</h1>
<div className='w-full flex items-center justify-center gap-5'>
	<img className='rounded-2xl hover:scale-105 w-1/5 duration-500 hover:opacity-80' src={tees} alt="" />
	<img className='rounded-2xl hover:scale-105 w-1/5 duration-500 hover:opacity-80' src={cargo} alt="" />
	<img className='rounded-2xl hover:scale-105 w-1/5 duration-500 hover:opacity-80' src={download} alt="" />
	<img className='rounded-2xl hover:scale-105 w-1/5 duration-500 hover:opacity-80' src={pants} alt="" />

</div>
{/* contact us */}
		
<section className="bg-white dark:bg-gray-900 my-20">
  <div className="container px-6 py-12 mx-auto">
    <div className="text-center">
      <p className="font-medium text-blue-500 dark:text-blue-400">Contact us</p>
      <h1 className="mt-2 text-2xl font-semibold text-gray-800 md:text-3xl dark:text-white">
        Get in touch
      </h1>
      <p className="mt-3 text-gray-500 dark:text-gray-400">
        Our friendly team is always here to chat.
      </p>
    </div>
    <div className="grid grid-cols-1 gap-12 mt-10 md:grid-cols-2 lg:grid-cols-3">
      <div className="flex flex-col items-center justify-center text-center">
        <span className="p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>
        </span>
        <h2 className="mt-4 text-lg font-medium text-gray-800 dark:text-white">
          Email
        </h2>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Our friendly team is here to help.
        </p>
        <p className="mt-2 text-blue-500 dark:text-blue-400">
          hello@merakiui.com
        </p>
      </div>
      <div className="flex flex-col items-center justify-center text-center">
        <span className="p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
        </span>
        <h2 className="mt-4 text-lg font-medium text-gray-800 dark:text-white">
          Office
        </h2>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Come say hello at our office HQ.
        </p>
        <p className="mt-2 text-blue-500 dark:text-blue-400">
          100 Smith Street Collingwood VIC 3066 AU
        </p>
      </div>
      <div className="flex flex-col items-center justify-center text-center">
        <span className="p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
            />
          </svg>
        </span>
        <h2 className="mt-4 text-lg font-medium text-gray-800 dark:text-white">
          Phone
        </h2>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Mon-Fri from 8am to 5pm.
        </p>
        <p className="mt-2 text-blue-500 dark:text-blue-400">
          +1 (555) 000-0000
        </p>
      </div>
    </div>
  </div>
</section>
<Footer/>
		</>
	  )}

	

	</>
  )
}

export default Home