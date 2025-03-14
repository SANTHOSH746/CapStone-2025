import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/JSX/Login";
import Home from "./components/JSX/Home"; 
import SignUp from "./components/JSX/SignUp";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} /> 
        <Route path="/SignUp" element={<SignUp />} />

      </Routes>
    </Router>
  );
};

export default App;
