import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";
import { IoMdEyeOff } from "react-icons/io";
import toast, { Toaster } from 'react-hot-toast'


export default function Login() {

  const {dispatch} = useContext(AuthContext)
  const [showPassword,setShowPassword] = useState(false)
  const [error,setError] = useState(null)
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const [checkBoxValue, setCheckBoxValue] = useState(false);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  const passHandler = (e) => {
   setShowPassword(prev => !prev)
  }

  const loginHandler = async () => {
    if (!loginDetails.email || !loginDetails.password) {
      return setError("All field must be filled");
    }
    try {
      const response = await fetch('http://localhost:4500/api/login', {
          headers: {
              "Content-Type": "application/json"
          },
          method: 'POST',
          body: JSON.stringify(loginDetails)
      })

      const responseData = await response.json()
      if (response.ok) {

          if (checkBoxValue) {
              localStorage.setItem('user', JSON.stringify(responseData.user))
          }
          dispatch({ type: 'LOGIN', payload: responseData.user })
      }
      setError(responseData.message)
  }
  catch (e) {
      console.log(e.message)
  }
  finally{
      
  }
 
  };

  const toastHandler = ()=> {
    toast.error(error)
  }

  useEffect(()=>{
    if(error){
      toastHandler();
    }
  },[error])
  return (
    <div className="main-background">
      <div className="loginpage">
        <div className="login-box">
          <div className="form-group">
            <h5 className="mb-3 text-center">Login</h5>
            <label htmlFor="">Email</label>
            <input
              type="email"
              className="form-control form-control-sm mb-2"
              name="email"
              value={loginDetails.email}
              onChange={changeHandler}
            />
            <label htmlFor="">Password</label>
            <div className="password">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={loginDetails.password}
              onChange={changeHandler}
            />
            <span className="pass-logo" onClick={passHandler}><IoMdEyeOff /></span>
            </div>
            
            <div className="d-flex align-items-center mt-2">
              <input
                type="checkbox"
                className="me-1"
                name="checkboxValue"
                onChange={(e) => setCheckBoxValue(e.target.checked)}
              />
              <small>Remember me?</small>
            </div>

            <div className="text-center mt-3">
              <button className="btn btn-primary btn-sm" onClick={loginHandler}>
                Login
              </button>
            </div>

            <hr />
            <p className="forgot-password text-center mb-3">
              Need an Account? | <Link to="/signup">Sign up</Link>
            </p>

            <p className="forgot-password text-center text-danger mb-1">
              <Link
                to="/forgotpassword"
                className="text-decoration-none text-danger"
              >
                Forgot your password?{" "}
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
