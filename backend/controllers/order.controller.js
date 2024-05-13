import { Order } from "../models/orders.models.js";


export const createOrder = async (req, res) => {
  try {
	const user = req.user._id
	
    const { product, totalPrice } = req.body;
	console.log("orderitems" , product);
	console.log("orderitems" , totalPrice);
    const newOrder = await Order({ user, product, totalPrice }).populate("product");
	const saveorder = await newOrder.save()
    res.status(201).json({message : "order created" , data : saveorder});
  } catch (error) {
	console.log(error);
    res.status(400).json({ message: 'Failed to create order' });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ user: userId }).populate('product');
    res.status(200).json({message : "order fetched",data : orders});
  } catch (error) {
    res.status(400).json({ message: 'Failed to get user orders', error: error.message });
  }
};


// Get all orders with specific fields populated from the associated product
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('product').populate('user');
    res.status(200).json({ message: 'All orders fetched', data: orders });
  } catch (error) {
    res.status(400).json({ message: 'Failed to get all orders', error: error.message });
  }
};


export const deleteOrder = async (req, res) => {
  try {
    const { orderid } = req.body;
    const deletedOrder = await Order.findByIdAndDelete(orderid);
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted', data: deletedOrder });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete order', error: error.message });
  }
};

//
export const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.orderid; // Corrected
   
    const { status } = req.body;
   

    const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update order status', error: error.message });
  }
};

