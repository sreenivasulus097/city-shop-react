import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shoppingCart: [],
  cartItemCount: 0,
  totalPriceCount: 0,
};

export const shoppingCartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addShoppingCartItem: (state, action) => {
      if (
        action.payload !== undefined &&
        action.payload !== null &&
        action.payload.id !== ""
      ) {
        state.shoppingCart.push(action.payload);
        state.totalPriceCount = state.totalPriceCount + action.payload.price;
        state.cartItemCount = state.cartItemCount + 1;
      }
    },
    removeShoppingCartItem: (state, action) => {
      const filteredCart = state.shoppingCart.filter(
        (product) => product.id !== action.payload.id
      );
      state.shoppingCart = filteredCart;
      console.log(state.shoppingCart);
      console.log("filteredCart::", filteredCart);
      state.cartItemCount = state.cartItemCount - 1;
      state.totalPriceCount = state.totalPriceCount - action.payload.price;
    },
  },
});

export const {
  addShoppingCartItem,
  removeShoppingCartItem,
} = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
