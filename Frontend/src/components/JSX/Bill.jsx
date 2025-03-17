import React from "react";
import "../CSS/Bill.css"; // Importing the updated CSS file
import { FaPlus, FaHome, FaFileInvoice, FaStore, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Billing = () => {

  const navigate = useNavigate();




  const data = [
    {
      billNo: 1,
      date: "2025-03-17",
      customerName: "Santhosh",
      totalAmount: "1500/-",
    },
    {
      billNo: 2,
      date: "2025-03-16",
      customerName: "Amol",
      totalAmount: "2300/-",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("userToken"); 
    localStorage.removeItem("shopName");
    navigate("/");
  };

  const N = localStorage.getItem("shopName");

  return (
    <div className="dashboard">
      {/* Sidebar remains unchanged */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>🏥 MediVault</h2>
        </div>
        <button className="quick-add-btn">
          <FaPlus /> Add Stock
        </button>
        <nav>
          <ul>
            <li onClick={() => (navigate("/Home"))}>
              <FaHome /> Home
            </li>
            <li  className="active">
              <FaFileInvoice /> Billing
            </li>
            <li>
              <FaStore /> Stock
            </li>
            <li>
              <FaUserCircle /> Profile
            </li>
          </ul>
        </nav>

        <div className="faq-section">
          <p>Have some questions?</p>
          <button className="faq-btn">Look at the FAQs</button>
        </div>
      </aside>

      <div className="main-content">
        <header className="top-header">
          <h2 className="NAM">{N}</h2>
          <div className="user-section">
            {/* Logout Button */}
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>
        <hr />

        {/* Create Bill Button */}
        <button className="create-bill">+ Create Bill</button>

        {/* Bill History Table */}
        <table className="bill-table">
          <thead>
            <tr>
              <th>Bill No</th>
              <th>Date</th>
              <th>Customer Name</th>
              <th>Total Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((bill, index) => (
              <tr key={index}>
                <td>{bill.billNo}</td>
                <td>{bill.date}</td>
                <td>{bill.customerName}</td>
                <td>{bill.totalAmount}</td>
                <td>
                  <button>View</button>
                  <button>Download</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Billing;
