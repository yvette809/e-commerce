import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS ,CART_SAVE_PAYMENT_METHOD} from "../constants/cartConstants";

// add item to cart

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const res = await axios.get(`http://localhost:4060/api/products/${id}`);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: res.data._id,
      name: res.data.name,
      image: res.data.image,
      price: res.data.price,
      countInStock: res.data.countInStock,
      qty: qty,
    },
  });
  // we stringify because we can only save string in local storage

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// remove item from Cart
// we use get state to get the products from the state

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};


// save shipping address
export const saveShippingAddress =(data)=>(dispatch)=>{
  dispatch({
    type:CART_SAVE_SHIPPING_ADDRESS,
    payload:data
  })
  localStorage.setItem('shippingAddress', JSON.stringify(data))
}

// save payment
export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  })

  localStorage.setItem('paymentMethod', JSON.stringify(data))
}