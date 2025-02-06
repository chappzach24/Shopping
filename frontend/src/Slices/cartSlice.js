import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      
      const existItem = state.cartItems.find((x) => x._id === item._id);
      
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id 
            ? { ...existItem, qty: existItem.qty + item.qty }
            : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );
      
    //   Shipping Price
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
      
      // Tax Price 15%
      state.taxPrice = addDecimals(Number(state.itemsPrice) * 0.15);
      
      // Total Price
      state.totalPrice = addDecimals(
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      );

      localStorage.setItem("cart", JSON.stringify(state));
    },
    
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      
      state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
      state.taxPrice = addDecimals(Number(state.itemsPrice) * 0.15);
      state.totalPrice = addDecimals(
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      );

      localStorage.setItem("cart", JSON.stringify(state));
    }
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;