import React, { useRef, useState } from "react";
import logo from "../assets/images/ecommerce-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarker,
  faSearch,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { filterSearch } from "../features/searchSlice";
import { removeSelectedProduct } from "../features/productSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const cartCount = useSelector(
    (state) => state.shoppingCartSlice.cartItemCount
  );
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      navigateSearchResults();
    }
  };
  console.log("Nav component cartCount", cartCount);
  const [searchTerm, setSearchTerm] = useState("");

  const searchInputRef = useRef("");
  const searchByRef = useRef("");
  const navigate = useNavigate();
  const allProductsList = useSelector(
    (state) => state.productSlice.allProducts
  );

  const searchInput = () => {
    console.log("onchange search", searchInputRef.current.value);
    setSearchTerm(searchInputRef.current.value);
  };

  const handleSelectedProduct = () => {
    console.log("remove selected product from menu header on click icon");
    dispatch(removeSelectedProduct());
  };

  const navigateSearchResults = () => {
    searchInputRef.current.value = "";
    console.log(
      "navigate search results, search by value",
      searchByRef.current.value
    );

    dispatch(
      filterSearch({
        searchQuery: searchTerm,
        allProductsLists: allProductsList,
        searchBy: searchByRef.current.value,
      })
    );
    navigate("/search");
  };
  return (
    <nav className="navbar navbar-expand-sm navbar-light">
      <div className="container-fluid">
        <Link to="/">
          <img
            src={logo}
            alt="Amazona Brand"
            className="brandLogo navbar-brand py-0"
          />
        </Link>

        <div className="input-group-btn d-block d-md-none ms-auto">
          <Link
            className="text-white mobile-cart-link"
            to="/shopping-cart"
            onClick={() => handleSelectedProduct()}
          >
            <FontAwesomeIcon className="" icon={faShoppingCart} />
            <span className="badge cart-badge-mobile">
              {cartCount === 0 ? "" : cartCount}
            </span>
          </Link>
          <button
            className="btn btn-default text-white fs-5"
            type="button"
            data-bs-target="#search-wrapper"
            data-bs-toggle="collapse"
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon bg-white"></span>
        </button>
        {/*  <div className="map-text w-20">
          <span className="hello-text">Hello</span>
          <span className="d-block text-nowrap">
            <FontAwesomeIcon icon={faMapMarker} /> Select Your Address
          </span>
        </div> */}

        <div
          id="search-wrapper"
          className="input-group collapse search-div mt-3 mt-md-0 mb-2 mb-md-0"
        >
          <div className="dropdown search-box">
            <select
              className="form-select search-drpdwn form-select-md"
              aria-label="Default select example"
              ref={searchByRef}
              defaultValue={"title"}
            >
              <option value="title">Title</option>
              <option value="description">Description</option>
              <option value="category">Category</option>
            </select>
          </div>
          <input
            type="hidden"
            name="search_param"
            value="all"
            id="search_param"
          />
          <input
            type="text"
            ref={searchInputRef}
            className="form-control"
            name="x"
            id="search"
            placeholder="Search"
            onChange={() => searchInput()}
            onKeyPress={(e) => handleKeyPress(e)}
          />
          <span className="input-group-btn search-icon">
            <button
              className="btn btn-default"
              type="button"
              onClick={() => navigateSearchResults()}
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </span>
        </div>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav  mb-lg-0">
            {/* <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
      </li>  
       <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
      </li> */}
            <li className="nav-item">
              <a className="nav-link" href="#">
                Feedback
              </a>
            </li>

            <li className="nav-item shopping-cart-item d-none d-md-block">
              <Link
                to="/shopping-cart"
                className="nav-link cart-link"
                onClick={() => handleSelectedProduct()}
              >
                <FontAwesomeIcon className="nav-link" icon={faShoppingCart} />
                <span className="badge cart-badge">
                  {cartCount === 0 ? "" : cartCount}
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
