import React from "react";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  fetchProductsAsync,
  fetchProductsByCategory,
} from "../features/productSlice";
import { categories } from "../features/productSlice";
import { useSearchParams } from "react-router-dom";

const ProductsList = (props) => {
  const productsStore = useSelector(fetchProducts);
  console.log("use selector products:", productsStore);

  const categoriesList = useSelector(categories);
  const dispatch = useDispatch();
  const [categoryTerm] = useSearchParams();

  console.log("category term", categoryTerm.get("category"));

  const filterProducts = (event) => {
    console.log("filter dropdown value on change", event.target.value);
    if (event.target.value === "none") {
      dispatch(fetchProductsAsync());
    } else {
      dispatch(fetchProductsByCategory(event.target.value));
    }
  };
  //const filterRefDrDown = useRef("None");

  return (
    <div className="container">
      <div className="row mt-3 mb-4">
        <div className="col-sm-12 col-md-6 text-center text-md-start mb-3 mb-md-0">
          <h2>City Shop Products List</h2>
        </div>
        <div className="col-sm-12 col-md-5 col-lg-3 ms-auto text-center text-md-end">
          <span className="fs-5 fw-800">Filter : </span>
          <select
            className="form-select filter-drpdwn form-select-xs"
            aria-label="Default select example"
            onChange={(e) => filterProducts(e)}
            defaultValue={props.catTerm ? false : true}
          >
            <option value="none">None</option>
            {categoriesList &&
              categoriesList.map((category) => {
                return (
                  <option
                    value={category}
                    selected={props.catTerm === category ? true : false}
                  >
                    {category}
                  </option>
                );
              })}
          </select>
        </div>
      </div>

      <div className="row">
        {productsStore !== null &&
        productsStore !== undefined &&
        productsStore.length > 0
          ? productsStore.map((product) => {
              return <Product product={product} />;
            })
          : "Loading..."}
      </div>
    </div>
  );
};

export default ProductsList;
