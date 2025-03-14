import React, {useState, useEffect} from "react";
import "../CSS/Login.css"; 
import axios from "axios";
import {useNavigate} from "react-router-dom";

const SignUp = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            alert("Passwords do not match");
            return;
        }
        try{
            const response = await axios.post("http://localhost:3000/api/Sign-Up", {
                name: name,
                email: email,
                password: password
            });
            
            if(response.status === 201){
                alert("User registered successfully");
                navigate("/Home");
            }
            else if(response.status === 404){
                alert("User already exists");
            }
        } catch(err){
            console.error(err);
        }
    };

    const login = () => {
        navigate("/");
    }




    return (
    <div className="login-wrapper">
      <div className="login-box">
        <h1 className="login-title">SignUp</h1>
        <h2> Shop Name</h2>
        <input type="text" placeholder="Enter your shop name" value={name} className="input-field" onChange={(e) => setName(e.target.value)}/>
        <h2>Email</h2>
        <input type="text" placeholder="Enter your email" value={email} className="input-field" onChange={(e)=> setEmail(e.target.value)}/>
        
        <h2>Create Password</h2>
        <input type="password" placeholder="Enter your password" value={password} className="input-field" onChange={(e)=> setPassword(e.target.value)}/>

        <h2>Confirm Password</h2>
        <input type="password" placeholder="Enter your password" value={confirmPassword} className="input-field" onChange={(e)=> setConfirmPassword(e.target.value)}/>



        <button className="login-button" onClick={handleSubmit}>SignUp</button>
        <div><p className="already">I already have an account</p><p onClick={login} className="log">Login</p></div>
      </div>
      
    </div>
  );
};

export default SignUp;
