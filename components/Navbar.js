import React, { useContext } from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import Cart from "./Cart";
import { StateContext, useStateContext } from "../context/StateContext";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/" className="logo-text">
          BORED APE
        </Link>
      </p>
      <button
        className="cart-icon"
        type="button"
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping />
        {totalQuantities > 0 && (
          <span className="cart-item-qty">{totalQuantities}</span>
        )}
      </button>
      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
