import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  fetchAllProductsAsync,
  fetchProductsAsync,
  fetchProductsByCategory,
} from "../features/productSlice";
import ProductsList from "./ProductsList";

const Home = () => {
  const dispatch = useDispatch();
  const [queryParams] = useSearchParams();
  const categoryParam = queryParams.get("category");
  //const filterRefDrDown = useRef("none");
  useEffect(() => {
    dispatch(fetchAllProductsAsync());
    if (categoryParam !== undefined && categoryParam !== null) {
      //filterRefDrDown.current.value = categoryParam;
      dispatch(fetchProductsByCategory(categoryParam));
    } else {
      dispatch(fetchProductsAsync());
    }
  }, [dispatch, categoryParam]);
  return <ProductsList catTerm={categoryParam} />;
};

export default Home;
