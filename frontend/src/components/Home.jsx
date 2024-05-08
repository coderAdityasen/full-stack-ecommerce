import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import GridLoader from 'react-spinners/GridLoader';

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
		<div className='w-full'>
	<img className='w-full' src="https://www.powerlook.in/_next/image?url=https%3A%2F%2Fcdn-media.powerlook.in%2Fmycustomfolder%2FSummer-Shirts-May-2024-.jpg&w=1200&q=75" alt="" />
</div>

<h1 className='my-10 text-center font-bold text-5xl'>Explore Our Products</h1>
<div className='w-full flex justify-center items-center my-28'>
	<div className='w-full flex gap-10 justify-center '>

		<div className='w-36 bg-white shadow-lg shadow-slate-300 rounded-lg hover:scale-110 transition-all duration-300'>
			<img className='w-36' src="https://www.powerlook.in/_next/image?url=https%3A%2F%2Fcdn-media.powerlook.in%2Fcatalog%2Fcategory%2F1_1_.jpg&w=256&q=75" alt="" />
			<h1 className='font-bold text-center'>
				shirts
			</h1>
		</div>

		<div className='w-36 bg-white shadow-lg shadow-slate-300 rounded-lg hover:scale-110 transition-all duration-300'>
			<img className='w-36' src="https://www.powerlook.in/_next/image?url=https%3A%2F%2Fcdn-media.powerlook.in%2Fcatalog%2Fcategory%2Fbottoms-march-2024.jpg&w=256&q=75" alt="" />
			<h1 className='font-bold text-center'>
				Bottoms
			</h1>
		</div>

		<div className='w-36 bg-white shadow-lg shadow-slate-300 rounded-lg hover:scale-110 transition-all duration-300'>
			<img className='w-36' src="https://www.powerlook.in/_next/image?url=https%3A%2F%2Fcdn-media.powerlook.in%2Fcatalog%2Fcategory%2Fjackets-march-2024.jpg&w=256&q=75" alt="" />
			<h1 className='font-bold text-center'>
				Jackets
			</h1>
		</div>

		<div className='w-36 bg-white shadow-lg shadow-slate-300 rounded-lg hover:scale-110 transition-all duration-300'>
			<img className='w-36' src="https://www.powerlook.in/_next/image?url=https%3A%2F%2Fcdn-media.powerlook.in%2Fcatalog%2Fcategory%2F3_1_.jpg&w=256&q=75" alt="" />
			<h1 className='font-bold text-center'>
				T-shirts
			</h1>
		</div>

		<div className='w-36 bg-white shadow-lg shadow-slate-300 rounded-lg hover:scale-110 transition-all duration-300'>
			<img className='w-36' src="https://www.powerlook.in/_next/image?url=https%3A%2F%2Fcdn-media.powerlook.in%2Fcatalog%2Fcategory%2F2_1_.jpg&w=256&q=75" alt="" />
			<h1 className='font-bold text-center'>
				jeans & Cargo
			</h1>
		</div>

		<div className='w-36 bg-white shadow-lg shadow-slate-300 rounded-lg hover:scale-110 transition-all duration-300'>
			<img className='w-36' src="https://www.powerlook.in/_next/image?url=https%3A%2F%2Fcdn-media.powerlook.in%2Fcatalog%2Fcategory%2Fclearance-march-2024.jpg&w=256&q=75" alt="" />
			<h1 className='font-bold text-center'>
				On Sale
			</h1>
		</div>
	</div>
</div>
		</>
	  )}

	

	</>
  )
}

export default Home