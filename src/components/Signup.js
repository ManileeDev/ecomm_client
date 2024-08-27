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
  });

  const [error, setError] = useState(null)
  const [otpbox, setotpbox] = useState(false);
  const [emailBox, setEmailBox] = useState(true);
  const [passwordBox, setPasswordBox] = useState(false);
  const [showPassword, setShowPassword] = useState(false)

  const [signupSuccess, setSignupSuccess] = useState(false)
  const [serverError, setServerError] = useState(false)
  const [loading, setLoading] = useState(false)

  const [otp, setOtp] = useState(new Array(4).fill(""))

  const fullOtp = otp.join("")

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
      const response = await fetch('https://vaa3ernrnomwlgmbzfveeyyqpi0cvjau.lambda-url.us-east-1.on.aws/api/signup', {
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
      const response = await fetch('https://vaa3ernrnomwlgmbzfveeyyqpi0cvjau.lambda-url.us-east-1.on.aws/api/generate-otp', {
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

    if (!fullOtp) {
      return setError('Please enter your otp')
    }

    try {
      setLoading(true)
      const response = await fetch('https://vaa3ernrnomwlgmbzfveeyyqpi0cvjau.lambda-url.us-east-1.on.aws/api/validate-otp', {
        headers: {
          "Content-Type": "application/json"
        },
        method: 'POST',
        body: JSON.stringify({ email: signupDetails.email, otp: fullOtp })
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

  const handleOTP = (e, index) => {
    if (isNaN(e.target.value)) return
    setOtp([...otp.map((data, i) => (i === index ? e.target.value : data))])
    if (e.target.value && e.target.nextSibling) {
      e.target.nextSibling.focus()
    }
    else if(e.key === "Backspace" && !e.target.value && index>0){
      const previousInput = e.target.previousSibling;
      if(previousInput) previousInput.focus();
      setOtp([...otp.map((data, i) => (i === index - 1 ? "" : data))])
    }
  }

  const handlePaste = (e) => {
    const value = e.clipboardData.getData("text").slice(0,otp.length);
    if (isNaN(value)) return
    setOtp([...value.split("")])
    const focusedInput = e.target.parentNode.querySelector("input:focus")
    if(focusedInput){
      focusedInput.blur();
    }
  }

  return (
    <div className="main-background">
      <div className="loginpage">
        <div className="login-box">
          <div className="form-control">
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
              <div className="otp-box">
                <label htmlFor="">Enter OTP</label>
                <div className="otp-field">
                  {
                    otp.map((data, i) => (
                    <input type="text" value={data} maxLength={1} 
                     onChange={(e) => handleOTP(e, i)} 
                     onKeyDown={(e)=> handleOTP(e,i)}
                     onPaste={e => handlePaste(e)} autoFocus={i===0}/>))
                  }
                </div>
                <div className="text-center">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={verifyOTP}
                  >
                    Verify
                  </button>
                </div>
              </div>
            )}

            {passwordBox && (
              <>
                <h5 className="mb-3 text-center">Signup</h5>
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
                <div className="text-center mt-3 mb-3">
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
