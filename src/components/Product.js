import React from "react";
import { Link } from "react-router-dom";
import uuid from "react-uuid";
const Product = (props) => {
  const { id, title, description, image } = props.product;
  return (
    <div
      className="card mb-5 w-20 col-lg-3 col-md-6 col-sm-12 text-center"
      key={uuid()}
    >
      <img
        className="card-img-top mx-auto"
        src={image}
        alt={title}
        style={{ width: "220px", height: "200px" }}
      />
      <div className="card-body">
        <h5 className="card-title" style={{ height: "50px" }}>
          {title}
        </h5>
        <p className="card-text" style={{ height: "150px" }}>
          {description}
        </p>

        <Link className="btn btn-secondary" to={`/products/${id}`}>
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Product;
