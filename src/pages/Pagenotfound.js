import React from "react";
import { Link } from "react-router-dom";

export default function Pagenotfound() {
  return (
    <div className="error-page-container d-flex flex-column align-items-center justify-content-center gap-3 vh-100">
      <h1 className="text-danger">404</h1>
      <h3>Oops ! Page Not Found</h3>
      <Link to="/" className="btn bg-black text-white">Go Back</Link>
    </div>
  );
}
