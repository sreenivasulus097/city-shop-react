import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  fetchProductAsync,
  removeSelectedProduct,
} from "../features/productSlice";

const SearchResults = () => {
  const [searchQueryValue, setSearchQueryValue] = useState("");
  //Use Search Param
  const searchParams = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //useSearchParams();
  //const searchParam = searchParams.get("searchQuery");
  //const searchParam = searchParams.state.searchQuery;
  //setSearchQueryValue(searchParams.get("searchQuery"));
  //console.log("searchParam value:::", searchParam);

  //Product list
  const filteredProducts = useSelector(
    (state) => state.searchSlice.searchFilterProducts
  );
  console.log("productlist", filteredProducts);
  //const [filteredProducts, setFilteredProducts] = useState([]);

  /*useEffect(
    () => {
      console.log("use effect");
      const results = productList.filter((product) => {
        return product.title.includes(searchParam);
      });
      console.log("results in search results page", results);
      setFilteredProducts(results);
    },
    filteredProducts,
    [searchParams]
  ); */

  const handleAddCart = (event) => {
    const productId = event.target.id;
    dispatch(removeSelectedProduct());
    dispatch(fetchProductAsync(productId));
    navigate(`/shopping-cart?productId=${event.target.id}`);
  };
  return (
    <div className="container">
      <h3>Search Results</h3>
      {filteredProducts.length !== 0 ? (
        <div className="row">
          <hr />
          {filteredProducts &&
            filteredProducts.map((shopProduct) => {
              return (
                <>
                  <div className="col-md-4 col-sm-12">
                    <img
                      src={shopProduct.image}
                      alt={shopProduct.title}
                      style={{ width: "250px", height: "auto" }}
                    />
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <ul className="list-group">
                      <li className="list-group-item border-0">
                        <h5>{shopProduct.title}</h5>
                      </li>
                      <li className="list-group-item border-0">
                        <p className="mw-100">{shopProduct.description}</p>
                      </li>
                      <li className="list-group-item border-0">
                        <span className="fw-bold">Category :</span>{" "}
                        {shopProduct.category}
                      </li>
                      <li className="list-group-item border-0">
                        <span className="fw-bold">Price :</span>
                        {shopProduct.price}
                      </li>
                    </ul>

                    <button
                      type="button"
                      className="btn btn-warning my-3"
                      id={shopProduct.id}
                      onClick={(e) => handleAddCart(e)}
                    >
                      Add to cart
                    </button>
                  </div>

                  <hr />
                </>
              );
            })}
        </div>
      ) : (
        <h5 className="mt-5 text-center">No Results Found</h5>
      )}
    </div>
  );
};

export default SearchResults;
