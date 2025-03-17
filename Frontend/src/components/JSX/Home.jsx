import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBell, FaUserCircle, FaPlus, FaBox, FaFileInvoice, FaStore, FaExclamationTriangle, FaInfoCircle, FaHome } from "react-icons/fa";
import "../CSS/Home.css"; // Importing the updated CSS file

const Dashboard = () => {

  
  const navigate = useNavigate(); // Hook for navigation

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("userToken"); // Remove token from local storage
    localStorage.removeItem("shopName"); // Remove shop name from local storage
    navigate("/"); // Redirect to login page
  };

  const N = localStorage.getItem("shopName")

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
            <li className="active"><FaHome /> Home</li>
            
            <li onClick={() => (navigate("/Billing"))}><FaFileInvoice /> Billing</li>
            <li><FaStore /> Stock</li>
            <li><FaUserCircle /> Profile</li>
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
          <h2 className="NAM">{N}</h2>
          <div className="user-section">
            
            
            
            {/* Logout Button */}
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        {/* Banner */}
        <section className="banner">
          <div className="banner-content">
            <h2 className="T">Your Inventory</h2>
            <button className="bill-btn"><FaPlus /> Create Bill</button>
          </div>
          <img src="https://www.shutterstock.com/image-vector/male-doctor-smiling-happy-face-600nw-2481032615.jpg" alt="Doctors" className="banner-img" />
        </section>

        {/* Stats Section */}
        <section className="stats">
          <div className="stat-card">
            <p>Out of stock products</p>
            <span className="alert-icon"><FaExclamationTriangle /></span>
            <h3>3</h3>
          </div>
          <div className="stat-card">
            <p>Products on low stock</p>
            <span className="info-icon"><FaInfoCircle /></span>
            <h3>3</h3>
          </div>
          <div className="stat-card">
            <p>Number of products to be arrived</p>
            <span className="truck-icon">🚚</span>
            <h3>12</h3>
          </div>
        </section>

        {/* Charts Section */}
        <section className="charts">
          <div className="chart-card">
            <h4>Weighted Score</h4>
            <img src="https://www.shutterstock.com/image-vector/pie-chart-3-divisions-260nw-2237665079.jpg" alt="Weighted Score" />
          </div>
          <div className="chart-card">
            <h4>Stock Percentage</h4>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPORuSR2p7MViDa7wrhv0iZk_iwZXgrxel4w&s" alt="Stock Percentage" />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;