import React from "react";
import { FaBell, FaUserCircle, FaPlus, FaClipboardList, FaBox, FaFileInvoice, FaTruck, FaStore, FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";
import "../CSS/Home.css"; // Importing the updated CSS file

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>🏥 Medicotary</h2>
        </div>
        <button className="quick-add-btn">
          <FaPlus /> Quick Add
        </button>
        <nav>
          <ul>
            <li className="active"><FaClipboardList /> Dashboard</li>
            <li><FaBox /> Products</li>
            <li><FaFileInvoice /> Billing</li>
            <li><FaStore /> Vendors</li>
            <li><FaTruck /> Delivery</li>
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
          <h2 className="NAM">Huma Medical Store</h2>
          <div className="user-section">
            <FaBell className="icon" />
            <span className="notification-count">3</span>
            <FaUserCircle className="icon user-icon" />
          </div>
        </header>

        {/* Banner */}
        <section className="banner">
          <div className="banner-content">
            <h2 className="T">Never worry about your Inventory</h2>
            <button className="bill-btn"><FaPlus /> Create a Bill</button>
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
            <span className="info-icon"><FaInfoCircle /></span>  {/* ✅ FIXED ICON */}
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
