import React, { useState } from "react";
import { useContext } from "react";
import { StateContext, useStateContext } from "../../context/StateContext";
import { client, urlFor } from "../../lib/client";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { Product } from "../../components";
import { addRequestMeta } from "next/dist/server/request-meta";

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);
  const { decQty, incQty, qty, onAdd } = useStateContext();
  // console.log(product);
  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="p-detail-image-container">
            <img
              className="p-detail-image"
              src={urlFor(image && image[index])}
            />
          </div>
          <div className="small-images-container">
            {image?.map((image, i) => (
              <img
                key={i}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                src={urlFor(image)}
                onMouseEnter={() => setIndex(i)}
                onMouseLeave={() => setIndex(0)}
              />
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">Rs {price}</p>
          <div className="quantity">
            <h3>Quantity: </h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num" onClick="">
                {qty}
              </span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button className="add-to-cart" onClick={() => onAdd(product, qty)}>
              Add to cart
            </button>
            <button className="buy-now" onClick="">
              Buy now
            </button>
          </div>
        </div>
      </div>
      <div className="maylike-products-wrapper">
        <h1>You may also like</h1>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  // console.log(product);

  return {
    props: { products, product },
  };
};

export default ProductDetails;
