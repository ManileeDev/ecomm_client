import React, { useContext } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { BsChatSquare } from "react-icons/bs";
import { LuShoppingCart } from "react-icons/lu";
import { IoMdGift } from "react-icons/io";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";
import { useSelector } from "react-redux";

export default function Footer() {

  // const {cartValue} = useContext(AuthContext)
 
  const cartValue = useSelector((state)=>state.auth.cartValue)

  console.log("Cartvalue :",cartValue)
  return (
    <div class="footer-sticky">
      <div class="footer-box">
        <span class="navbar-icon-style-footer">
          <div>
            <Link to="/home">
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
            <span className="cart-span">{cartValue}</span>
          </div>
          Cart
        </span>
        <span class="navbar-icon-style-footer">
          <div>
            <Link>
              <IoMdGift />
            </Link>
          </div>
          Orders
        </span>
        <span class="navbar-icon-style-footer">
          <div>
            <Link>
              <CgProfile />
            </Link>
          </div>
          Profile
        </span>
      </div>
    </div>
  );
}
