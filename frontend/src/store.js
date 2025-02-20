import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./Slices/apiSlice";
import cartSliceReducer from "./Slices/cartSlice";


const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
