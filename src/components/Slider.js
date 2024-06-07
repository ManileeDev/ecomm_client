import React, { useContext} from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/Authcontext';
import { RxCross2 } from "react-icons/rx";
import toast, { Toaster } from 'react-hot-toast';

const Slider = ({ show , handleClose }) => {
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
  
  return ReactDOM.createPortal (
    <div>
      <div className="navbar-side-box">
        <div className='p-3 text-danger' onClick={handleClose}><RxCross2 /></div>
        {user ? <div className="account-name"><h5>{user?.fullname}</h5></div> : <Link to="/login" className='account-name text-decoration-none text-black'>Login here</Link>}
        <div className='list-data'>
          <hr />
          {user && <Link to="/managepassword"><p>Change your password</p></Link>}
          <hr />
          {user && <p><button className='btn btn-sm btn-custom mt-2' onClick={confirmHandler}>Logout</button></p>}
        </div>
      </div>
      <Toaster/>
      <div className={`slider-container ${show ? "" : "d-none"}`} onClick={handleClose}></div>
    </div>,
     document.getElementById("portal")
  )
}

export default Slider;