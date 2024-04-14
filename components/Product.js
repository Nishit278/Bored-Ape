import React from "react";
import { urlFor } from "../lib/client";
import Link from "next/link";
const Product = ({ product: { details, image, name, slug, price } }) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <div className="image-container">
            <img src={urlFor(image && image[0])} className="product-image" />
          </div>
          <div className="product-info">
          <p className="product-name">{name}</p>
          <p className="product-details">{details.replace("·", "")}</p>
          <p className="product-price">₹{price.toLocaleString()}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Product;
