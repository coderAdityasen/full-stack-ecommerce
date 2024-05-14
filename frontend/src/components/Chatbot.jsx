import React, { useEffect, useRef, useState } from 'react'
import Navbar from "../components/Navbar"
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addaidata, adduserdata } from '../reducers/AichatReducer'

function Chatbot() {
  const {register, handleSubmit , reset} = useForm()
  const [loading , setloading] = useState(false)
  const dispatch = useDispatch()
  const chats = useSelector((state)=> state.aichat.chat)
  const chatContainerRef = useRef(null);
  const user = useSelector((state)=>state.user.userData)
 
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats]);


 const formsubmmision =async (data)=>{
  try {
    dispatch(adduserdata({ text : data.message , person : user.fullname , image : user.avatar}))
    setloading(true)
   const send = {
    message : data.message
   }
   const response = await axios.post("https://full-stack-ecommerce-api-jade.vercel.app/openai/prompt" , send)
   dispatch(addaidata(response.data.data))
   reset()
  } catch (error) {
    
  } finally{
    setloading(false)
  }
 }


  return (<>
  
  
	<Navbar/>
  <div className='w-full flex flex-col justify-center items-center m-auto'>
    <div ref={chatContainerRef} className='h-[75vh]  w-[60rem] p-5 overflow-y-auto' id="displaychat">
    
    {
      chats.map((chat)=>{
        return (
          <div className='w-full my-5 flex gap-3 justify-center' key={chat.id}>
            <div className='w-32 h-5 mt-1  rounded-full'>
              <img className=' object-cover rounded-full' src={chat.image ? (chat.image) : ("https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png") } alt="" />
            </div>
            <div>
            <p className='font-semibold'>{chat.person}</p>
              <h1 className='w-[55rem]'>{chat.text}</h1>
            </div>
              
          </div>
        )
      })
    }
    {
      loading ? (<div className='w-full animate-pulse'>
        <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-[80%] mb-2.5"></div>
        <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-[70%]"></div>
        <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-[75%] mb-2.5"></div>
      </div>) : null
    }
    </div>

    <div className='flex items-center w-[50rem] py-2 px-3 bg-gray-50 rounded-lg'>
      <form className='flex gap-5 w-full' onSubmit={handleSubmit(formsubmmision)} >
      <input  
      {...register("message", {
				required: true,
			})}
       className='g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ' type="text" />
       {
        loading ? (<>
       <svg
  aria-hidden="true"
  className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 cursor-not-allowed"
  viewBox="0 0 100 101"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
    fill="currentColor"
  />
  <path
    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
    fill="currentFill"
  />
</svg>

        </>) : (<>
          <button type='submit' className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'>
        send
      </button>
        </>)
       }
     
      </form>
      
    </div>
  </div>
  </>
  )
}

export default Chatbot