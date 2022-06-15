import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  fetchProductAsync,
  removeSelectedProduct,
} from "../features/productSlice";
import {
  addShoppingCartItem,
  removeShoppingCartItem,
} from "../features/shoppingCartSlice";

const ShoppingCart = () => {
  const selectedProduct = useSelector((state) => state.productSlice.product);
  console.log("selected product::", selectedProduct.title);
  const totalPrice = useSelector(
    (state) => state.shoppingCartSlice.totalPriceCount
  );
  const cartItemCount = useSelector(
    (state) => state.shoppingCartSlice.cartItemCount
  );
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  //Products in cart
  const cartProducts = useSelector(
    (state) => state.shoppingCartSlice.shoppingCart
  );
  console.log("cart products length::" + cartProducts.length);
  console.log("cartProducts in shopping cart", cartProducts);

  useEffect(() => {
    const cartValue = searchParams.get("cart");

    if (
      cartValue !== undefined &&
      cartValue !== "" &&
      cartValue !== null &&
      cartValue === "add"
    ) {
      dispatch(addShoppingCartItem(selectedProduct));
    }
  }, [dispatch, searchParams]);

  useEffect(() => {
    const productId = searchParams.get("productId");
    if (
      productId !== undefined &&
      selectedProduct.title !== undefined &&
      productId !== "" &&
      selectedProduct.title !== "" &&
      productId !== null &&
      selectedProduct.title !== null
    ) {
      console.log("shopping cart else if");
      dispatch(addShoppingCartItem(selectedProduct));
    }
    return () => {
      console.log("shopping cart return function");
      // dispatch(removeSelectedProduct());
    };
  }, [dispatch, selectedProduct]);

  const removeItemFromCart = (prod) => {
    dispatch(removeShoppingCartItem(prod));
  };

  return (
    <div className="container">
      <h2>Shopping Cart</h2>
      {cartProducts.length !== 0 ? (
        <div className="row text-center text-md-start">
          <div className="col-sm-2 ms-auto d-none d-md-block">
            <span className="fw-bold">Price</span>
          </div>
          <hr />
          {cartProducts &&
            cartProducts.map((shopProduct) => {
              return (
                <>
                  <div className="col-md-4 col-sm-12">
                    <img
                      src={shopProduct.image}
                      alt={shopProduct.title}
                      style={{ width: "250px", height: "auto" }}
                    />
                  </div>
                  <div className="col-md-6 col-sm-8">
                    <ul className="list-group">
                      <li className="list-group-item border-0">
                        <h5>{shopProduct.title}</h5>
                      </li>
                      <li className="list-group-item border-0">
                        <p className="mw-100">{shopProduct.description}</p>
                      </li>
                      <li className="list-group-item border-0 d-block d-md-none">
                        <p className="mw-100">
                          <span className="fw-bold me-1">Price:</span>
                          {shopProduct.price}
                        </p>
                      </li>
                      <li className="list-group-item border-0">
                        <span className="fw-bold">Category : </span>
                        {shopProduct.category}
                      </li>
                      <li className="list-group-item border-0">
                        <button
                          type="button"
                          className="btn btn-warning"
                          onClick={() => removeItemFromCart(shopProduct)}
                        >
                          Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div className="col-sm-4 col-md-2 d-none d-md-block">
                    {shopProduct.price}
                  </div>
                  <hr />
                </>
              );
            })}
          <div className="col-sm-4 col-md-4 col-lg-3 ms-auto">
            {cartItemCount === 1 ? (
              <>
                Sub Total (1 item):
                <span className="fw-bold ms-1">{totalPrice}</span>
              </>
            ) : (
              <>
                Sub Total ({cartItemCount} items):
                <span className="fw-bold ms-1">{totalPrice}</span>
              </>
            )}
          </div>
        </div>
      ) : (
        <h5 className="mt-5 text-center">Shopping Cart is empty</h5>
      )}
    </div>
  );
};

export default ShoppingCart;
