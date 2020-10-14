import axios from "axios";
import { CART_ADD_ITEM } from "../constants/cartConstants";

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
