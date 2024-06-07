import React, { useState } from "react";
import { NavLink, Link, } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import Slider from "./Slider";


export default function Navbar() {
  const [show,setShow] = useState(false)

  const handleClose = () => setShow(false)

  return (
    <div className="navbar">
      <div className="d-flex gap-3 mt-2">
        <div onClick={() => setShow(true)}><GiHamburgerMenu /></div>
        <h2 className="fw-bold"><Link to="/" className="logo">Lee Store</Link></h2>
      </div>
      <div className="navbar-link d-flex text-center">
        <NavLink className='nav-link' to="/"><IoMdHome /></NavLink>
        <NavLink className='nav-link' to="/favourites"><FaHeart /></NavLink>
        <NavLink className='nav-link' to="/cart"><FaShoppingCart /></NavLink>
      </div>
      {show && <Slider show={show} handleClose={handleClose}/>}
    </div>
    
  );
}


