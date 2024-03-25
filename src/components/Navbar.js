import React, { useContext } from "react";
import { AuthContext } from "../context/Authcontext";
import { NavLink, Link, } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

import { RiLogoutCircleRFill } from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";

export default function Navbar() {
  const { user, dispatch } = useContext(AuthContext);

  // const confirmHandler = () => {
  //   let text = "DO YOU WANT TO LOGOUT?";
  //   if (window.confirm(text) == true) {
  //     logoutHandler();
  //     toast.success("Logout Successfull")
  //   } else {
  //     toast.error("Logout Failed");
  //   }
  // }
  const logoutHandler = () => {
    dispatch({ type: "LOGOUT" })
    localStorage.removeItem("user");
  };


  console.log(user)
  return (
    <div className="navbar">
      
       <div className="d-flex gap-3 mt-2">  <div><GiHamburgerMenu/></div>    <h2 className="fw-bold"><Link to="/home" className="logo">Lee Store</Link></h2>
</div>
      <div className="navbar-link d-flex text-center">
        <NavLink className='nav-link' to="/home"><IoMdHome /></NavLink>
        <NavLink className='nav-link' to="/favourites"><FaHeart /></NavLink>
        <NavLink className='nav-link' to="/cart"><FaShoppingCart /></NavLink>
        {/* {user && <RiLogoutCircleRFill onClick={confirmHandler} />} */}
        {/* <span>{user?.fullname.slice(0, 4)}</span> */}
      </div>
      <Toaster />
    </div>
  );
}


