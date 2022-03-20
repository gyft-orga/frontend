import React from "react";
import { Link } from "react-router-dom";

export function Nav() {
  return (
    <nav>
      <Link to="/" style={{marginRight: "10px"}}>Home</Link>
      <Link to="/login" style={{marginRight: "10px"}}>Login</Link>
      <Link to="/register">Register</Link>
    </nav>
  );
}
