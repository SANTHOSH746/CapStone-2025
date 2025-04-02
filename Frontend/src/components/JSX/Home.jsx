import React, {useState} from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { FaBell, FaUserCircle, FaPlus, FaBox, FaFileInvoice, FaStore, FaExclamationTriangle, FaInfoCircle, FaHome } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux"; // Import Redux hooks
import { logout } from "../redux/authSlice"; // Import logout action
import "../CSS/Home.css"; // Importing the updated CSS file

const Dashboard = () => {
  const navigate = useNavigate(); // Hook for navigation
  const dispatch = useDispatch(); // Get Redux dispatch function
  const shopName = useSelector((state) => state.auth.shopName); // Get shop name from Redux store
  const userEmail = useSelector((state) => state.auth.userEmail);

    const [billData, setBillData] = useState({
      medicineName: "",
      customerName: "",
      date : new Date().toLocaleDateString(),  // This extracts only the date (YYYY-MM-DD)
  
      quantity: "",
      expiryDate: "",
      manufacturingDate: "",
      price: "",
    });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    setBillData({ ...billData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put("http://localhost:3000/api-bills/create", {
        userEmail,
        items: [billData],
      });

      
    } catch (err) {
      console.log("Error submitting bill:", err);
    }

    setIsModalOpen(false);
  };

  

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
            <li className="active"><FaHome /> Home</li>
            <li onClick={() => navigate("/Billing")}><FaFileInvoice /> Billing</li>
            <li onClick={() => navigate("/Stock")}><FaStore /> Stock</li>
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

        {/* Banner */}
        <section className="banner">
          <div className="banner-content">
            <h2 className="T">Your Inventory</h2>
            <button className="bill-btn" onClick={() => setIsModalOpen(true)}><FaPlus /> Create Bill</button>
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
            <p>Total Number of stocks</p>
            
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
      {/* Create Bill Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Create Bill</h2>
            <h3>Customer Name</h3>
            <input type="text" name="customerName" value={billData.customerName} onChange={handleChange} required />
            <h3>Medicine Name</h3>
            <input type="text" name="medicineName" value={billData.medicineName} onChange={handleChange} required />
            <h3>Qty</h3>
            <input type="number" name="quantity" value={billData.quantity} onChange={handleChange} required />
            <h3>manufacturing date</h3>
            <input type="date" name="manufacturingDate" value={billData.manufacturingDate} onChange={handleChange} required />
            <h3>Expery date</h3>
            <input type="date" name="expiryDate" value={billData.expiryDate} onChange={handleChange} required />
            <h3>Price</h3>
            <input type="number" name="price" value={billData.price} onChange={handleChange} required />

            <div className="modal-actions">
              <button onClick={handleSubmit}>Submit</button>  
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
