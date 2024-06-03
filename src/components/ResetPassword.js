import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { IoMdEyeOff } from "react-icons/io";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [reset, setReset] = useState(false);
  const {token} = useParams();
  const navigate = useNavigate();
  const passHandler = (e) => {
    setShowPassword(prev => !prev)
  }

  const resetHandler = () => {
    if (!password || !confirmPassword) {
      return setError("Password must be filled")
    }
    axios.post(`https://ecomm-backend-z1w5.onrender.com/api/resetpassword/${token}`,{password}).then(response => {
        console.log(response.data)
        setReset(true);
        setError(null); 
    }).catch((err) => {
      setError(err.response.data.message)
    })
    
  }
 useEffect(()=>{
  if(error){
    toast.error(error)
    setError(null)
  }
 })

 useEffect(()=>{
   if(reset){
    toast.success("Password reset successfully")
    setTimeout(() => {
      navigate("/login")
    }, 2000)
    setReset(false)
   }
 },[reset])


  
  return (
    <div>
      <div className="main-background">
      <div className="loginpage">
        <div className="login-box">
          <div className="form-control">
            <h5 className="mb-3 text-center">Reset Password</h5>
         <label htmlFor="">Password</label> <span className="pass-logo" onClick={passHandler}><IoMdEyeOff /></span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control form-control-sm"
                  name="password"
                  value={password}
                  onChange={e=>setPassword(e.target.value)}
                ></input>

                <label htmlFor="">Confirm Password</label> <span className="pass-logo" onClick={passHandler}><IoMdEyeOff /></span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control form-control-sm"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e)=>setConfirmPassword(e.target.value)}
                ></input>
                <div className="text-center mt-3 mb-3">
                  <button className="btn btn-primary btn-sm" onClick={resetHandler}>Reset</button>
                </div>
                </div>
                </div>
                </div>
                </div>
                <Toaster/>
    </div>
  )
  }
