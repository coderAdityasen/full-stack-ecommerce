import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import {baseUrl} from "../util/apis"

function VIewallorders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${baseUrl}/order/getallorder`, { withCredentials: true });
        setOrders(response.data.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await axios.post(`${baseUrl}/order/updatestatus/${orderId}`, { status: newStatus }, { withCredentials: true });
      // Assuming you want to update the orders list after updating the status
      const updatedOrders = orders.map(order => {
        if (order._id === orderId) {
          return { ...order, status: newStatus };
        }
        return order;
      });
      setOrders(updatedOrders);
      toast.success(`status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <>
     <Toaster position="top-center" reverseOrder={false} />
    <div className='w-full overflow-scroll h-[95vh]'>
      {
        orders.map((order) => (
          <div className="flex items-center justify-between bg-slate-200 my-3" key={order._id}>
            <div className="flex gap-5 items-center text-xl">
              <div className="w-20 h-15 overflow-hidden">
                <img src={order.product.image} className="" alt="" />
              </div>
              <h1>{order.product.title}</h1>
              <h1>{order.product.price}</h1>
            </div>
            <div className='flex gap-4 mx-5'>
              <select value={order.status} onChange={(e) => handleUpdateStatus(order._id, e.target.value)}>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="shipping">Shipping</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))
      }
    </div>
  </>
  );
}

export default VIewallorders;
