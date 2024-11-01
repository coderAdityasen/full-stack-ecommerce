import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {Navbar} from "../components/index";
import axios from "axios";
import { useSelector } from "react-redux";
import GridLoader from "react-spinners/GridLoader";
import { baseUrl } from "../util/apis";

function OrderPage() {
  const [product, setProduct] = useState([]);
  const [order , setOrder] = useState(null)
  const [loading , setloading] = useState(false)
  const { prodId } = useParams();
  const [activeSection, setActiveSection] = useState("orderSummary");
  const [proceed, setProceed] = useState(false);
  const user = useSelector((state) => state.user.userData);
  const shippingCharge = 70;

  const countries = ["China", "Russia", "UK"];
  const [menu, setMenu] = useState(false);
  const [country, setCountry] = useState("United States");

  const changeText = (e) => {
    setMenu(false);
    setCountry(e.target.textContent);
  };

  const total = product.price + shippingCharge;
  useEffect(() => {
	setloading(true)
    const fetchData = async () => {
      const response = await axios.get(
        `${baseUrl}/api/products/${prodId}`
      );
      return setProduct(response.data.product);
    };

    fetchData();
	setloading(false)
  }, []);

  const handleProceed = () => {
    switch (activeSection) {
      case "orderSummary":
        setActiveSection("address");
        break;
      case "address":
        setActiveSection("payment");
        break;
      case "payment":
        setActiveSection("orderStatus");
        break;
      default:
        break;
    }
    setProceed(false); // Reset proceed state
  };


  const handlecreateorder = async ()=>{
	try {
		setloading(true)
		const response = {
			product : prodId,
			totalPrice : total
		} 

		const senddata = await axios.post(`${baseUrl}/order/createorder` , response , {withCredentials : true})
		
		setOrder(senddata.data.data)
		
		handleProceed()
		setloading(false)
	} catch (error) {
		setloading(false)
		console.log("error while sending the data " , error);
	}
  }



  return (
    <>
      <Navbar />
	  

      {/* Advanced table */}
      <div className="flex w-full my-20  ">
        {/* Sidebar */}
        <div className="grid gap-3 mx-10">
          <button
            className={`p-3 ${
              activeSection === "orderSummary"
                ? "bg-blue-500 text-white"
                : "bg-slate-300 text-black"
            }`}
            disabled={proceed || activeSection === "orderSummary"}
          >
            Order Summary
          </button>
          <button
            className={`p-3 ${
              activeSection === "address"
                ? "bg-blue-500 text-white"
                : "bg-slate-300 text-black"
            }`}
            disabled={proceed || activeSection === "address"}
          >
            Address
          </button>
          <button
            className={`p-3 ${
              activeSection === "payment"
                ? "bg-blue-500 text-white"
                : "bg-slate-300 text-black"
            }`}
            disabled={proceed || activeSection === "payment"}
          >
            Billing
          </button>
          <button
            className={`p-3 ${
              activeSection === "orderStatus"
                ? "bg-blue-500 text-white"
                : "bg-slate-300 text-black"
            }`}
            disabled={proceed || activeSection === "orderStatus"}
          >
            Order Status
          </button>
        </div>

        {/* Content box */}
		{loading  ? (
        <>
          <div className="flex w-full h-[100vh] m-auto items-center justify-center">
            <GridLoader color="#36d7b7" />
          </div>
        </>
      ) : null}

        <div className={` h-96 w-full ${loading ? "hidden" : "block"}`}>
          {activeSection === "orderSummary" && (
            <div className="flex w-[90%] h-full justify-between ">
              <div className="w-full  ">
                <h1 className="font-bold text-2xl m-2">product</h1>
                <div className="flex justify-between w-10/12 border-2 rounded-lg border-gray-100 px-2 py-1  items-center">
                  <div className="flex gap-3  items-center">
                    <img className="w-8" src={product.image} alt="" />
                    <h1 className="font-medium">{product.title}</h1>
                  </div>
                  <h1 className="font-medium">${product.price}</h1>
                </div>
              </div>

              <div className="w-4/12 mr-10 ">
                <h1 className="font-bold text-2xl m-2">Order Summry</h1>
                <div className="bg-slate-100 rounded-xl my-4 py-1">
                  <ul className="flex flex-col gap-5 mx-3 my-3">
                    <li className="flex justify-between">
                      subtotal price{" "}
                      <h1 className="font-semibold">${product.price}</h1>
                    </li>
                    <li className="flex justify-between">
                      Shipping charge
                      <h1 className="font-semibold">${shippingCharge}</h1>
                    </li>
                    <hr />
                    <li className="flex justify-between">
                      Email<h1 className="font-semibold">{user.email}</h1>
                    </li>
                    <hr />
                    <li className="flex justify-between ">
                      Total amount to pay
                      <h1 className="font-bold text-indigo-500">${total}</h1>
                    </li>
                  </ul>
                </div>
                <button
                  className="bg-indigo-500 text-xl my-5 text-white px-28 py-1 rounded-lg"
                  onClick={handleProceed}
                >
                  Proceed
                </button>
              </div>
            </div>
          )}
          {activeSection === "address" && (
            <form className="max-w-md mx-auto" onSubmit={handleProceed}>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="email"
                  name="floating_email"
                  id="floating_email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                 required={true}
                />
                <label
                  htmlFor="floating_email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Email address
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="floating_password"
                  id="floating_password"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                 required={true}
                />
                <label
                  htmlFor="floating_password"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Landmark
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="repeat_password"
                  id="mobilenumber"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                 required={true}
                />
                <label
                  htmlFor="mobilenumber"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  permanant address
                </label>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="floating_first_name"
                    id="floating_first_name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                   required={true}
                  />
                  <label
                    htmlFor="floating_first_name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    First name
                  </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="floating_last_name"
                    id="floating_last_name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                   required={true}
                  />
                  <label
                    htmlFor="floating_last_name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Last name
                  </label>
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="tel"
                    name="floating_phone"
                    id="floating_phone"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                   required={true}
                  />
                  <label
                    htmlFor="floating_phone"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Phone number (123-456-7890)
                  </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="tel"
                    name="floating_company"
                    id="floating_company"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                   required={true}
                  />
                  <label
                    htmlFor="floating_company"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Alternate number
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="text-white bg-indigo-600  hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl w-full sm:w-auto px-20 py-2 text-center "
              >
                Checkout
              </button>
            </form>

			// ek function jo check krega is user ka adress h ya nhai agar h to vo show krna h nahi h ya new address add krna h ya to usi address ko update krenge
          )}
          {activeSection === "payment" && (
            <div className=" px-4  md:px-6 2xl:px-0 flex items-center 2xl:mx-auto 2xl:container">
              <div className="flex flex-col justify-start items-start w-[50rem] space-y-9">
                <div className="flex flex-col xl:flex-row justify-center xl:justify-between space-y-6 xl:space-y-0 xl:space-x-6 w-full">
                  <div className="p-8 bg-gray-100 flex flex-col lg:w-full xl:w-3/5">
                    <button className="border border-transparent hover:border-gray-300 bg-gray-900 hover:bg-white text-white hover:text-gray-900 flex flex-row justify-center items-center space-x-2 py-4 rounded w-full">
                      <div>
                        <svg
                          className="fill-current"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="https://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.9099 4.27692C9.6499 4.27692 9.1174 4.87817 8.2399 4.87817C7.34021 4.87817 6.65396 4.28129 5.56208 4.28129C4.49333 4.28129 3.35365 4.93379 2.6299 6.04535C1.61365 7.61285 1.78615 10.565 3.43208 13.08C4.02083 13.9804 4.80708 14.99 5.83833 15.001H5.85708C6.75333 15.001 7.01958 14.4141 8.25302 14.4072H8.27177C9.48677 14.4072 9.73052 14.9975 10.623 14.9975H10.6418C11.673 14.9866 12.5015 13.8679 13.0902 12.971C13.514 12.326 13.6715 12.0022 13.9965 11.2725C11.6155 10.3688 11.233 6.99348 13.5877 5.69942C12.869 4.79942 11.859 4.27817 10.9068 4.27817L10.9099 4.27692Z"
                            fill="currentColor"
                          />
                          <path
                            d="M10.6338 1C9.88379 1.05094 9.00879 1.52844 8.49629 2.15188C8.03129 2.71688 7.64879 3.555 7.79879 4.36781H7.85879C8.65754 4.36781 9.47504 3.88688 9.95254 3.27063C10.4125 2.68406 10.7613 1.85281 10.6338 1V1Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-base leading-4">Pay</p>
                      </div>
                    </button>

                    <div className="flex flex-row justify-center items-center mt-6">
                      <hr className="border w-full" />
                      <p className="flex flex-shrink-0 px-4 text-base leading-4 text-gray-600">
                        or pay with card
                      </p>
                      <hr className="border w-full" />
                    </div>

                    <div className="mt-8">
                      <input
                        className="border border-gray-300 p-4 rounded w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                        type="email"
                        placeholder="Email"
                      />
                    </div>

                    <label className="mt-8 text-base leading-4 text-gray-800">
                      Card details
                    </label>
                    <div className="mt-2 flex-col">
                      <div>
                        <input
                          className="border rounded-tl rounded-tr border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                          type="email"
                          placeholder="0000 1234 6549 15151"
                        />
                      </div>
                      <div className="flex-row flex">
                        <input
                          className="border rounded-bl border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                          type="email"
                          placeholder="MM/YY"
                        />
                        <input
                          className="border rounded-br border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                          type="email"
                          placeholder="CVC"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-8 bg-gray-100 flex flex-col lg:w-full xl:w-3/5">
                    <label className="mt-8 text-base leading-4 text-gray-800">
                      Name on card
                    </label>
                    <div className="mt-2 flex-col">
                      <div>
                        <input
                          className="border rounded border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                          type="email"
                          placeholder="Name on card"
                        />
                      </div>
                    </div>

                    <label className="mt-8 text-base leading-4 text-gray-800">
                      Country or region
                    </label>
                    <div className="mt-2 flex-col">
                      <div className="relative">
                        <button
                          className="text-left border rounded-tr rounded-tl border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600 bg-white"
                          type="email"
                        >
                          {country}
                        </button>
                        <svg
                          onClick={() => setMenu(!menu)}
                          className={
                            "transform  cursor-pointer absolute top-4 right-4 " +
                            (menu ? "rotate-180" : "")
                          }
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="https://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3.5 5.75L8 10.25L12.5 5.75"
                            stroke="#27272A"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div
                          className={
                            "mt-1 absolute z-10 w-full flex bg-gray-50 justify-start flex-col text-gray-600 " +
                            (menu ? "block" : "hidden")
                          }
                        >
                          {countries.map((country) => (
                            <div
                              key={country}
                              className="cursor-pointer hover:bg-gray-800 hover:text-white px-4 py-2"
                              onClick={changeText}
                            >
                              {country}
                            </div>
                          ))}
                        </div>
                      </div>
                      <input
                        className="border rounded-bl rounded-br border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                        type="text"
                        placeholder="ZIP"
                      />
                    </div>

                    <button
                      className="mt-8 border border-transparent hover:border-gray-300 bg-gray-900 hover:bg-slate-50 text-white hover:text-gray-900 flex justify-center items-center py-4 rounded w-full"
                      onClick={handlecreateorder}
                    >
                      <div>
                        <p className="text-base leading-4">Pay ${total}</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeSection === "orderStatus" && (
            <div>
              {/* Order status, delivered data, payment */}

			  <div className="w-full  ">
                <h1 className="font-bold text-2xl m-2">order</h1>
                <div className="flex justify-between w-10/12 border-2 rounded-lg border-gray-100 px-2 py-1  items-center">
                  <div className="flex gap-3  items-center">
                    <img className="w-8" src={product.image} alt="" />
                    <h1 className="font-medium">{product.title}</h1>
                  </div>
				  <h1 className="font-semibold">order status : <span className="text-green-500">{order != null? (<>{order.status}</>): null}</span> </h1>
                </div>
              </div>

			 
              <br />
              <button className="text-white bg-indigo-600  hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl w-full sm:w-auto px-20 py-2 text-center "
			   >
				<Link to="/products">
				 Continue Shopping
				</Link>
               
              </button>
            </div>
          )}
        </div>

		
      </div>
    </>
  );
}

export default OrderPage;
