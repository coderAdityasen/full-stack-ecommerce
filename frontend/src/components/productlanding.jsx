import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import GridLoader from "react-spinners/GridLoader";
import {Navbar} from "./index";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { fetchcart } from "../reducers/CartReducer";
import { baseUrl } from "../util/apis";

function Productlanding() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [comments, setcomment] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { register, handleSubmit , reset} = useForm();
  const existedUser = useSelector((state) => state.user);
  const cart = useSelector((state)=> state.cart)

  const { productid } = useParams();


const handleBuyNow = (productId) => {
  
  try {
    if(!existedUser.status){
      navigate("/login")

    }else{
      navigate(`/placeorder/${productId}`)
    }
  } catch (error) {
    console.log(error);
  }
};

  const handleAddToCart = async (id) => {
    try {
      const data = {
        owner: existedUser.userData._id,
        product: id,
      };

      const response = await axios.post(
        `${baseUrl}/cart/addtocart/${existedUser.userData._id}`,
        data
      );
      console.log(response);
      
      dispatch(fetchcart(existedUser.userData._id))
      
    } catch (error) {
      navigate("/login")
    }
  };



  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      const response = await axios.get(
        `${baseUrl}/api/products/${productid}`
      );
      setLoading(false)
      return setProduct(response.data.product);
    };
    
    fetchData();
  }, []);

  useEffect(() => {
      setLoading(true)
    const fetchdata = async () => {
      const fetchcomment = await axios.get(
        `${baseUrl}/api/products/comments/${productid}`
      );
      //   console.log(fetchcomment.data.comments);
     
      return setcomment(fetchcomment.data.comments);
    };
    setLoading(false)
    fetchdata();
  }, [comments]);

 

  const handlecomment = async (data) => {
    setLoading(true)
    if (!existedUser.status) {
      navigate("/login");
    }
    const commentdata = {
      owner: existedUser.userData._id,
      product: productid,
      ...data,
    };
    await axios.post(
      `${baseUrl}/api/product/comment/${existedUser.userData._id}` , commentdata
    );

	reset()

  setLoading(false)
  };


 
  return (
    <>
      <Navbar />
      {loading ? (
        <div className="flex w-full h-[100vh] m-auto items-center justify-center">
          <GridLoader color="#36d7b7" />
        </div>
      ) : (
        <div className="w-full h-full mt-16">
          <div className="w-11/12 h-[80vh] grid xl:flex justify-center m-auto">
            <div className=" mx-16 h-full">
              <img src={product.image} className="w-full h-full" alt="" />
            </div>
            <div className="ml-20">
              <h1 className="font-bold text-3xl m-5">{product.title}</h1>
              <h1 className=" text-3xl m-5">${product.price}</h1>
              <h1 className=" text-3xl m-5">{product.description}</h1>
              {!cart.cart.find((item) => item.product._id === product._id) ? (
                    <button
                      className="px-4 py-2  bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                      onClick={() => {
                       handleAddToCart(product._id)
                      }}
                    >
                      Add to cart
                    </button>
                  ) : (
                    <Link to="/cart">
                    <button
                    className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                  >
                    Go to cart
                    
                  </button>
                  </Link>
                  )}
                 
                 
                 <button 
                  className="px-4 py-2 mx-3 bg-yellow-400 text-gray-900 hover:text-gray-700 text-xs font-bold uppercase rounded "
                  onClick={() => handleBuyNow(product._id)}
                >
                  Buy Now
                </button>
                         
                  
			  <h1 className="text-3xl my-10 mx-5">
                      Ratings & Reviews ⭐⭐⭐⭐
                    </h1>
              {comments.map((comment) => {
                return (
                  <div key={comment._id}>
                   
                    <div className="flex items-center pb-10 m-10">
                      <img
                        className="w-[5rem] h-[5rem] mb-3 rounded-full shadow-lg object-cover"
                        src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTYD4o5SFO-r_N7iHu0p7QBLYCljQkYMWRQSAsaUP1p1Ht3hwri"
                        alt="Bonnie image"
                      />
                      <div className="mx-5">
                        <h1>⭐⭐⭐⭐⭐</h1>
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                          {comment.content}
                        </h5>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {comment.owner.username}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}

              <form
                onSubmit={handleSubmit(handlecomment)}
                className="max-w-sm mx-auto"
              >
                <div className="mb-5">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Write a Review
                  </label>
                  <input
                    type="text"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register("content", {
                      required: true,
                    })}
                  />
                </div>
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Productlanding;
