import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  fetchProduct,
  fetchProductAsync,
  removeSelectedProduct,
} from "../features/productSlice";

const ProductDetails = () => {
  const product = useSelector(fetchProduct);
  const { productId } = useParams();
  const dispatch = useDispatch();
  console.log(productId);
  useEffect(() => {
    dispatch(removeSelectedProduct());
    dispatch(fetchProductAsync(productId));
    return () => {
      // dispatch(removeSelectedProduct());
    };
  }, [productId, dispatch]);

  return (
    <div className="container">
      {product.id === undefined ? (
        <div>Loading....</div>
      ) : (
        <div className="row mt-4 text-center text-md-start">
          <div className=" col-sm-12 col-md-5 mb-3 mb-md-0 text-center">
            <img
              src={product.image}
              alt={product.title}
              style={{ width: "250px", height: "auto" }}
            />
          </div>

          <div className=" col-sm-12 col-md-4">
            <h3>{product.title}</h3>
            <p>{product.description}</p>
          </div>
          <div className="col-sm-12 col-md-3">
            <ul className="list-unstyled">
              <li>
                <span className="fw-bold">Category :</span> {product.category}
              </li>
              <li>
                <span className="fw-bold">Price :</span> {product.price}
              </li>
              <li className="">
                <Link to={`/shopping-cart?cart=add`}>
                  <button type="button" className="btn btn-warning mt-3">
                    Add to cart
                  </button>
                </Link>
              </li>
            </ul>
          </div>
          {/*   <div className="col-sm-4 text-center">
            <Link to={`/shopping-cart?cart=add`}>
              <button type="button" className="btn btn-warning mt-3">
                Add to cart
              </button>
            </Link>
      </div> */}
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
