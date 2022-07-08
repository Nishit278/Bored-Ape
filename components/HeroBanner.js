import Link from "next/link";
import React from "react";
import { urlFor } from "../lib/client";

const HeroBanner = ({ heroBanner }) => {
  return (
    <div className="hero-banner-container">
      <div className="hero-banner-texts">
        <p className="beats-solo">{heroBanner.smallText}</p>
        <h3>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText1}</h1>
        {/* <h1>{heroBanner.largeText1}</h1> */}
        <Link href={`/product/${heroBanner.product}`}>
          <button type="button">{heroBanner.buttonText}</button>
        </Link>
      </div>
      <div className="hero-image-container">
        <img
          src={urlFor(heroBanner.image)}
          alt="tshirt"
          className="hero-banner-image"
        />
      </div>
    </div>
  );
};

export default HeroBanner;
