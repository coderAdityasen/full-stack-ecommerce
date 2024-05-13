import React, { useEffect, useState } from 'react'
import axios from "axios"
import Navbar from "../components/Navbar"

function Orderview() {
	const [orders , setorders] = useState([])

	useEffect(()=>{
		const fetch = async ()=>{
			const response = await axios.get("http://localhost:8000/order/getorder" , {withCredentials : true})
			console.log(response.data.data);
			setorders(response.data.data)
		}

		fetch()
	}, [])
		
	
  return (
	<>
	<Navbar/>
	
	<h1 className='text-center font-bold text-2xl my-5'>Your Orders</h1>

	<div className=' ml-[10rem] flex flex-col gap-5'>
		{
			orders.map((order)=>{
				return (
					
                <div key={order._id} className="flex justify-between w-10/12 border-2 rounded-lg border-gray-100 px-2 py-1  items-center">
                  <div className="flex gap-3  items-center">
                    <img className="w-8" src={order.product.image} alt="" />
                    <h1 className="font-medium">{order.product.title}</h1>
                  </div>
				  <h1 className="font-semibold">order status : <span className="text-green-500">{order != null? (<>{order.status}</>): null}</span> </h1>
                
            </div>

				)
			})
		}
	</div>
	</>
  )
}

export default Orderview