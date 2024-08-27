import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

export default function ForgotPassword() {

  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [emailsent, setEmailsent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      return setError("Email must be filled")
    }
    axios.post("https://vaa3ernrnomwlgmbzfveeyyqpi0cvjau.lambda-url.us-east-1.on.aws/api/forgotpassword",{email}).then(response => {
        setEmailsent(true);
        setError(null);
        
    }).catch((err) => {
      setError(err.response.data.message)
    })
  }

  useEffect(()=>{
    if(error){
      toast.error(error)
    }
  },[error])

  useEffect(()=>{
    if(emailsent){
      toast.success("Mail sent")
    }
  },[emailsent])

  return (
    <>
      <div className="main-background">
      <div className="loginpage">
        <div className="login-box">
          <div className="form-control">
            <h5 className="mb-3 text-center">Change Password</h5>
      <label htmlFor="">Email</label>
      <input
        type="email"
        value={email}
        id="email"
        className="form-control form-control-sm mb-2"
        name="email"
        onChange={(e)=>setEmail(e.target.value)}
        required
      />
      <div className="text-center mt-3 d-flex gap-2">
        <button
          className="btn btn-primary btn-sm"
          onClick={handleSubmit}
        >
          Send
        </button>
        <button className="btn btn-success btn-sm"><Link to="/login" className="text-decoration-none text-white">Back</Link></button>
      </div>
      </div>
      </div>
      </div>
      </div>
      <Toaster/>
    </>
  )
}
