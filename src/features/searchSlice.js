import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchFilterProducts: [],
};

const searchFilResults = (allProductsLists, searchQuery, searchBy) => {
  return allProductsLists.filter((product) => {
    const { title, description, category } = product;
    return product[searchBy].toLowerCase().includes(searchQuery.toLowerCase());
  });
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    filterSearch: (state, action) => {
      const { allProductsLists, searchQuery, searchBy } = action.payload;
      console.log("search slice", allProductsLists, searchQuery);
      const results = searchFilResults(allProductsLists, searchQuery, searchBy);
      console.log("search slice results", results);
      return { ...state, searchFilterProducts: results };
    },
  },
});

export default searchSlice.reducer;

export const { filterSearch } = searchSlice.actions;
