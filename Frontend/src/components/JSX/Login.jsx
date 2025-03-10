import React from "react";
import "../CSS/Login.css"; // Ensure this file is in the same folder

const Login = () => {
  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h1 className="login-title">Login</h1>
        <h2>Email</h2>
        <input type="text" placeholder="Enter your email" className="input-field" />
        
        <h2>Password</h2>
        <input type="password" placeholder="Enter your password" className="input-field" />

        <button className="login-button">Login</button>
      </div>
    </div>
  );
};

export default Login;
