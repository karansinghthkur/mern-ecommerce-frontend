import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
  CLEAR_CART_ITEMS,
  LOAD_CART_ITEMS,
} from "../constants/cartConstants";

import api from "../utils/axiosInstance";

// Add to Cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await api.get(`/book/${id}`);

  dispatch({
    type: ADD_TO_CART,
    payload: {
      book: data.book._id,
      name: data.book.name,
      price: data.book.price,
      image: data.book.images[0].url,
      stock: data.book.stock,
      quantity,
    },
  });

  const { user } = getState().user;
  if (user) {
    await api.post("/cart/save", { cartItems: getState().cart.cartItems });
  }

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// Remove from Cart
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });

  const { user } = getState().user;
  if (user) {
    await api.post("/cart/save", { cartItems: getState().cart.cartItems });
  }

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// Save Shipping Info
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};

// Load Cart Items
export const loadCartItems = (userId) => async (dispatch) => {
  const { data } = await api.get(`/cart/${userId}`);

  dispatch({
    type: LOAD_CART_ITEMS,
    payload: data.cartItems,
  });
};

// Clear Cart Items
export const clearCartItems = () => async (dispatch) => {
  dispatch({
    type: CLEAR_CART_ITEMS,
  });

  localStorage.removeItem("cartItems");
};
