import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    }
  ,
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'shipping', 'delivered'],
    default: 'pending'
  },
  
}, { timestamps: true });

export const Order = mongoose.model('Order', orderSchema);


