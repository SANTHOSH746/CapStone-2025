import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/JSX/Login";
import SignUp from "./components/JSX/SignUp";
import Home from "./components/JSX/Home";
import Billing from "./components/JSX/Bill";  // Import Billing Page
import LoginHome from "./components/PrivateRoute/LoginHome";
import HomeLogin from "./components/PrivateRoute/HomeLogin";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<HomeLogin />}>
          <Route path="/" element={<Login />} />
        </Route>
        <Route path="/" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />

        {/* Protect Home and Billing Pages */}
        <Route element={<LoginHome />}>
          <Route path="/Home" element={<Home />} />
          <Route path="/Billing" element={<Billing />} /> {/* New Route */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
