import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../features/productSlice";
import shoppingCartSlice from "../features/shoppingCartSlice";
import searchSlice from "../features/searchSlice";
export const store = configureStore({
  reducer: {
    productSlice,
    shoppingCartSlice,
    searchSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
