import React from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="main-background d-flex justify-content-center align-items-center vh-100">
      <button className="btn btn-success" onClick={()=>navigate('/home')}>Get Started</button>
    </div>
  );
}
