import React, { useContext, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { BsChatSquare } from "react-icons/bs";
import { LuShoppingCart } from "react-icons/lu";
import { IoMdGift } from "react-icons/io";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";
import { useSelector } from "react-redux";
import { CartContext } from "../context/CartContext";
import Slider from "./Slider";

export default function Footer() {

  const {cart} = useContext(CartContext)
  const [show,setShow] = useState(false)

  const closeModal = () => {
    setShow(false)
  }

  return (
    <div class="footer-sticky">
      <div class="footer-box">
        <span class="navbar-icon-style-footer">
          <div>
            <Link to="/">
              <AiOutlineHome />
            </Link>
          </div>
          Home
        </span>
        <span class="navbar-icon-style-footer">
          <div>
            <Link to="/chats">
              <BsChatSquare />
            </Link>
          </div>
          Chats
        </span>
        <span class="navbar-icon-style-footer">
          <div className="cart-icon">
            <Link to="/cart">
              <LuShoppingCart>
              </LuShoppingCart>
            </Link>
            <span className="cart-span">{cart.length}</span>
          </div>
          Cart
        </span>
        <span class="navbar-icon-style-footer">
          <div>
            <Link to="/orders">
              <IoMdGift />
            </Link>
          </div>
          Orders
        </span>
        <span class="navbar-icon-style-footer">
          <div onClick={()=>setShow(true)}>
              <CgProfile />
          </div>
          Profile
        </span>
      </div>
      {(show) && <Slider handleClose={closeModal} show={show}/>}
    </div>
  );
}
