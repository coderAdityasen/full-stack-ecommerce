import { Cart } from "../models/usercart.models.js";

export const getCartItem = async (req, resp) => {
    try {
        const ownerId = req.params.userid;

        // Find all cart items belonging to the specified owner
        const cartItems = await Cart.find({ owner: ownerId }).populate('product');
        return resp.status(200).json({ status: true, cartItems });
    } catch (error) {
        console.error(error);
        return resp.status(500).json({ status: false, error: true });
    }
};


export const addToCart = async (req, resp) => {
    try {
        const { product, owner } = req.body;

        // Check if the product is already in the cart
        const existingCart = await Cart.findOne({ product, owner });

        if (existingCart) {
            // If the product is already in the cart, increment its quantity
            existingCart.quantity++;
            const updatedCart = await existingCart.save();
            return resp.status(200).json({ status: true, cart: updatedCart });
        } else {
            // If the product is not in the cart, create a new cart item
            const newCart = new Cart({ product, owner });
            const savedCart = await newCart.save();
            return resp.status(201).json({ status: true, cart: savedCart });
        }
    } catch (err) {
        console.error(err);
        return resp.status(500).json({ status: false, error: true });
    }
};

export const decrement = async (req, resp) => {
    try {
        const ownerId = req.params.userid;
        const { product } = req.body;

        // Find the cart item by product and owner ID
        const cartItem = await Cart.findOne({ product, owner: ownerId });

        if (!cartItem) {
            return resp.status(404).json({ status: false, message: 'Cart item not found' });
        }

        // If the quantity is already 1, remove the item from the cart
        if (cartItem.quantity === 1) {
            await cartItem.remove();
            return resp.status(200).json({ status: true, message: 'Item removed from cart' });
        }

        // If the quantity is greater than 1, decrement the quantity
        cartItem.quantity--;
        const updatedCartItem = await cartItem.save();

        return resp.status(200).json({ status: true, cart: updatedCartItem });
    } catch (error) {
        console.error(error);
        return resp.status(500).json({ status: false, error: true });
    }
};

export const deleteCartItem = async (req, resp) => {
    try {
        const ownerId = req.params.userid;
        const { product } = req.body;

        // Find the cart item by product and owner ID
        const cartItem = await Cart.findOne({ product: product, owner: ownerId });

        if (!cartItem) {
            return resp.status(404).json({ status: false, message: 'Cart item not found' });
        }

        // Remove the cart item from the database
        await Cart.deleteOne({ _id: cartItem._id });

        return resp.status(200).json({ status: true, message: 'Cart item deleted successfully' });
    } catch (error) {
        console.error(error);
        return resp.status(500).json({ status: false, error: true });
    }
};