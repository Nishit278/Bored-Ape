import React from "react";
import { urlFor } from "../lib/client";
import Link from "next/link";
const Product = ({ product: { image, name, slug, price } }) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <div className="image-container">
            <img src={urlFor(image && image[0])} className="product-image" />
          </div>
          <p className="product-name">{name}</p>
          <p className="product-price">Rs{price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
