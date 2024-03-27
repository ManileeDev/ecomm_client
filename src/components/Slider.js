import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/Authcontext';
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import toast, { Toaster } from 'react-hot-toast';

const Slider = ({ showside , show }) => {
  const { user,dispatch } = useContext(AuthContext)
  const confirmHandler = () => {
    let text = "DO YOU WANT TO LOGOUT?";
    if (window.confirm(text) == true) {
      logoutHandler();
      toast.success("Logout Successfull")
    } else {
      toast.error("Logout Failed");
    }
  }
  const logoutHandler = () => {
    dispatch({ type: "LOGOUT" })
    localStorage.removeItem("user");
  };
  
  return (
    <div>
      <div className="navbar-side-box">
        <div className='p-3' onClick={() => showside((prev) => !prev)}><RxCross2 /></div>
        {user ? <div className="account-name"><h5>{user?.fullname}</h5></div> : <Link to="/login" className='account-name text-decoration-none text-black'>Login here</Link>}
        <div className='list-data'>
          <hr />
          <Link><p>Change your password</p></Link>
          <hr />
          {user && <p><button className='btn btn-danger btn-sm mt-2' onClick={confirmHandler}>Logout</button></p>}
        </div>
      </div>
      <Toaster/>
      <div className={`popup-container ${!show ? "" : "d-none"}`}></div>
    </div>
  )
}

export default Slider;