import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBell, FaUserCircle, FaPlus, FaBox, FaFileInvoice, FaStore, FaExclamationTriangle, FaInfoCircle, FaHome } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux"; // Import Redux hooks
import { logout } from "../redux/authSlice"; // Import logout action
import "../CSS/Stock.css"; // Importing the updated CSS file

const Dashboard = () => {
  const navigate = useNavigate(); // Hook for navigation
  const dispatch = useDispatch(); // Get Redux dispatch function
  const shopName = useSelector((state) => state.auth.shopName); // Get shop name from Redux store

  // Logout Function
  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>🏥 MediVault</h2>
        </div>
        <button className="quick-add-btn">
          <FaPlus /> Add Stock
        </button>
        <nav>
          <ul>
            <li onClick={() => navigate("/Home")}><FaHome /> Home</li>
            <li onClick={() => navigate("/Billing")}><FaFileInvoice /> Billing</li>
            <li className="active" ><FaStore /> Stock</li>
            <li onClick={() => navigate("/Profile")}><FaUserCircle /> Profile</li>
          </ul>
        </nav>
        <div className="faq-section">
          <p>Have some questions?</p>
          <button className="faq-btn">Look at the FAQs</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Header */}
        <header className="top-header">
          <h2 className="NAM">{shopName}</h2>
          <div className="user-section">
            {/* Logout Button */}
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>
      </main>

      
      
    </div>
  );
};

export default Dashboard;
