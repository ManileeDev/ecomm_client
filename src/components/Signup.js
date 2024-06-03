import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator"
import toast, { Toaster } from 'react-hot-toast'
import { IoMdEyeOff } from "react-icons/io";



export default function Signup() {
  const [signupDetails, setSignupDetails] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const [error, setError] = useState(null)
  const [otpbox, setotpbox] = useState(false);
  const [emailBox, setEmailBox] = useState(true);
  const [passwordBox, setPasswordBox] = useState(false);
  const [showPassword, setShowPassword] = useState(false)

  const [signupSuccess, setSignupSuccess] = useState(false)
  const [serverError, setServerError] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  const passHandler = (e) => {
    setShowPassword(prev => !prev)
  }

  const signupHandler = async (e) => {
    e.preventDefault();

    if (signupDetails.fullname && signupDetails.email && signupDetails.phone && signupDetails.password) {
      if (signupDetails.password !== signupDetails.confirmPassword)
        return setError('Password must match')
    }
    try {
      setLoading(true)
      const response = await fetch('https://ecomm-backend-z1w5.onrender.com/api/signup', {
        headers: {
          "Content-Type": "application/json"
        },
        method: 'POST',
        body: JSON.stringify(signupDetails)
      })
      const responseData = await response.json()
      if (response.ok) {
        toast.success("Signup Successfull")
        return setSignupSuccess(true)
      }
      setError(responseData.message)
    }
    catch (e) {
      setServerError(true)
    } finally {
      setLoading(false)
    }
  }


  const otpgenerator = async () => {
    if (!validator.isEmail(signupDetails.email)) {
      return setError('Invalid email')
    }
    try {
      setLoading(true)
      const response = await fetch('https://ecomm-backend-z1w5.onrender.com/api/generate-otp', {
        headers: {
          "Content-Type": "application/json"
        },
        method: 'POST',
        body: JSON.stringify({ email: signupDetails.email })
      })
      const json = await response.json()

      if (!response.ok) {
        return setError(json.message)
      }
      setEmailBox(false)
      toast.success("OTP Sent to Mail")
      setotpbox(true)
    } catch (e) {
      setServerError(true)
    }
    finally {
      setLoading(false)
    }
  }

  const verifyOTP = async () => {

    if (!signupDetails.otp) {
      return setError('Please enter your otp')
    }

    try {
      setLoading(true)
      const response = await fetch('https://ecomm-backend-z1w5.onrender.com/api/validate-otp', {
        headers: {
          "Content-Type": "application/json"
        },
        method: 'POST',
        body: JSON.stringify({ email: signupDetails.email, otp: signupDetails.otp })
      })
      const json = await response.json()

      if (!response.ok) {
        return setError(json.message)
      }
      setotpbox(false)
      toast.success("OTP Verified")
      setPasswordBox(true)
    } catch (e) {
      setServerError(true)
    } finally {
      setLoading(false)
    }
  }

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setError(null)
    setSignupDetails({ ...signupDetails, [name]: value });
  };

  const toastHandler = () => {
    toast.error(error)
  }

  useEffect(() => {
    if (error) {
      toastHandler();
    }
  }, [error])

  useEffect(() => {
    if (signupSuccess) {
      setTimeout(() => {
        navigate("/login")
      }, 2000)
    }
  }, [signupSuccess])
  return (
    <div className="main-background">
      <div className="loginpage">
        <div className="login-box">
          <div className="form-control">
            <h5 className="mb-3 text-center">Signup</h5>
            {/* {error && <div className='text-center my-2'>
                                    <small className='text-danger'>{error}</small>
                                </div>} */}
            {emailBox && (
              <>
                <label htmlFor="">Email</label>
                <input
                  type="email"
                  value={signupDetails.email}
                  className="form-control form-control-sm mb-2"
                  name="email"
                  onChange={changeHandler}
                  required
                />
                <div className="text-center mt-3 d-flex gap-2">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={otpgenerator}
                  >
                    Generate OTP
                  </button>
                  <button className="btn btn-success btn-sm"><Link to="/login" className="text-decoration-none text-white">Back</Link></button>
                </div>
              </>
            )}
            {otpbox && (
              <>
                <label htmlFor="">Please OTP to Verify</label>
                <input
                  type="number"
                  value={signupDetails.otp}
                  className="form-control form-control-sm mb-2"
                  name="otp"
                  minLength="4"
                  onChange={changeHandler}
                  required
                />
                <div className="text-center mt-3">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={verifyOTP}
                  >
                    Verify
                  </button>
                </div>
              </>
            )}

            {passwordBox && (
              <>
                <label htmlFor="">Full Name</label>
                <input
                  type="text"
                  className="form-control form-control-sm mt-2"
                  name="fullname"
                  value={signupDetails.fullname}
                  onChange={changeHandler}
                ></input>
                <label htmlFor="">Email</label>
                <input
                  type="email"
                  className="form-control form-control-sm"
                  name="email"
                  onChange={changeHandler}
                  value={signupDetails.email}
                ></input>
                <label htmlFor="">Phone</label>
                <input
                  type="Number"
                  className="form-control form-control-sm"
                  name="phone"
                  onChange={changeHandler}
                  value={signupDetails.phone}
                ></input>
                <label htmlFor="">Password</label> <span className="pass-logo" onClick={passHandler}><IoMdEyeOff /></span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control form-control-sm"
                  name="password"
                  value={signupDetails.password}
                  onChange={changeHandler}
                ></input>

                <label htmlFor="">Confirm Password</label> <span className="pass-logo" onClick={passHandler}><IoMdEyeOff /></span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control form-control-sm"
                  name="confirmPassword"
                  value={signupDetails.confirmPassword}
                  onChange={changeHandler}
                ></input>
                <div className="text-center mt-3">
                  <button className="btn btn-primary btn-sm" onClick={signupHandler}>Register</button>
                </div>
                <hr />
                <p className="forgot-password text-center mb-3">
                  Have an account ? | <Link to="/login">Login</Link>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
