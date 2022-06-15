import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  allProducts: [],
  products: [],
  product: {},
  categories: [],
};

//FETCH PRODUCTS DEFAULT USAGE
export const fetchAllProductsAsync = createAsyncThunk(
  "products/fetchAllProducts",
  async () => {
    try {
      const response = Promise.all([
        await axios.get("https://fakestoreapi.com/products"),
        await axios.get("https://fakestoreapi.com/products/categories"),
      ]);
      console.log("all products", response);
      return response;
    } catch (error) {
      console.log("Error while fetching all products", error);
      return error.message;
    }
  }
);

//FETCH PRODUCTS HOME
export const fetchProductsAsync = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");

      //console.log(response);
      return response.data;
    } catch (error) {
      console.log("Error while getting the products", error);
      return error.message;
    }
  }
);

//FETCH PRODUCT
export const fetchProductAsync = createAsyncThunk(
  "products/fetchProduct",
  async (productId) => {
    try {
      console.log("fetch product asyncthunk");
      const response = await axios.get(
        `https://fakestoreapi.com/products/${productId}`
      );
      return response.data;
    } catch (err) {
      console.log("Error while fetch the product");
    }
  }
);

//FETCH PRODUCTS BY CATEGORY
export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchProductsByCategory",
  async (category) => {
    try {
      console.log("fetch products by category");
      const response = await axios.get(
        `https://fakestoreapi.com/products/category/${category}`
      );

      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log("Error while fetching products by category");
    }
  }
);

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    removeSelectedProduct: (state, action) => {
      return { ...state, product: {} };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state, action) => {
        console.log("Pending Status");
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        return {
          ...state,
          allProducts: action.payload[0].data,
          categories: action.payload[1].data,
        };
      })
      .addCase(fetchAllProductsAsync.rejected, (state, payload) => {
        console.log("rejected");
      })
      .addCase(fetchProductsAsync.pending, (state, action) => {
        console.log("Pending Status");
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        return {
          ...state,
          products: action.payload,
        };
      })
      .addCase(fetchProductsAsync.rejected, (state, payload) => {
        console.log("rejected");
      })
      .addCase(fetchProductAsync.pending, (state, action) => {
        console.log("Fetch Product details in pending state");
      })
      .addCase(fetchProductAsync.fulfilled, (state, action) => {
        return { ...state, product: action.payload };
      })
      .addCase(fetchProductAsync.rejected, (state, action) => {
        console.log("error");
      })
      .addCase(fetchProductsByCategory.pending, (state, action) => {
        console.log("Fetch Product details in pending state");
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        return {
          ...state,
          products: action.payload,
        };
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        console.log("error");
      });
  },
});

export const { removeSelectedProduct } = productSlice.actions;
export const fetchAllProducts = (state) => state.productSlice.allProducts;
export const fetchProducts = (state) => state.productSlice.products;
export const fetchProduct = (state) => state.productSlice.product;
export const categories = (state) => state.productSlice.categories;
export default productSlice.reducer;
