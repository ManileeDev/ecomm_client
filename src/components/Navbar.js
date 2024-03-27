import React, { useContext, useState } from "react";
import { AuthContext } from "../context/Authcontext";
import { NavLink, Link, } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import toast, { Toaster } from "react-hot-toast";
import Slider from "./Slider";


export default function Navbar() {
  const [showside, setShowside] = useState(false)
  const [show,setShow] = useState(false)

  return (
    <div className="navbar">
      <div className="d-flex gap-3 mt-2">
        <div onClick={() => setShowside(!showside)}><GiHamburgerMenu /></div>
        <h2 className="fw-bold"><Link to="/home" className="logo">Lee Store</Link></h2>
      </div>
      <div className="navbar-link d-flex text-center">
        <NavLink className='nav-link' to="/home"><IoMdHome /></NavLink>
        <NavLink className='nav-link' to="/favourites"><FaHeart /></NavLink>
        <NavLink className='nav-link' to="/cart"><FaShoppingCart /></NavLink>
      </div>
      <Toaster />
      {(showside) && <Slider showside={setShowside} show={show}/>}
    </div>
    
  );
}


