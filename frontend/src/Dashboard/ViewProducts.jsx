import React, { useEffect, useState } from "react";
import GridLoader from "react-spinners/GridLoader";
import axios from "axios";
import { Link } from "react-router-dom";
import { baseUrl } from "../util/apis";

function ViewProducts() {
  const [products, setProducts] = useState([]);
  const [refersh, setrefresh] = useState(true);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    const getdata = async () => {
      const getprod = await axios.get("/api/products");
      setProducts(getprod.data.data);
      setloading(false);
    };
    setloading(true);
    getdata();
  }, [refersh, setrefresh]);

  const handleDelete = (id) => {
    const getprod = async () => {
      const deleteprod = await axios.get(
        `${baseUrl}/api/delete/${id}`
      );
      console.log(deleteprod);
      setrefresh(!refersh);
      setloading(false);
    };
    return getprod();
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

      <div className={`${loading ? "hidden" : null} `}>
        <div className="w-full m-auto">
          {products.map((prod) => {
            return (
              <div className="flex items-center justify-between bg-slate-200 my-3" key={prod._id}>
                <div className="flex gap-5 items-center text-xl">
					<div className="flex gap-5 items-center">
					<div className="w-20 h-15 overflow-hidden">
					<img src={prod.image} className="" alt="" />
					</div>
				
                <h1>{prod.title}</h1>
                <h1>{prod.price}</h1>
                <h1>{prod.stock}</h1>
				</div>
					</div>
					
				
                <button
				className="bg-red-500 text-white px-2 py-2"
                  onClick={() => {
                    handleDelete(prod._id);
                    setloading(true);
                  }}
                >
                  Delete product
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default ViewProducts;
