import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/Bill.css"; 
import { FaPlus, FaHome, FaFileInvoice, FaStore, FaUserCircle, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice"; 

const Billing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const shopName = useSelector((state) => state.auth.shopName);
  const userEmail = useSelector((state) => state.auth.userEmail);
  
  

  const [bills, setBills] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null); 
  const [billData, setBillData] = useState({
    medicineName: "",
    customerName: "",
    date : new Date().toLocaleDateString(), 

    quantity: "",
    expiryDate: "",
    manufacturingDate: "",
    price: "",
  });
  

  useEffect(() => {
    const fetchBills = async () => {
      if (userEmail) {
        try {
          const response = await axios.get(`http://localhost:3000/api-bills/all?userEmail=${userEmail}`);
        
          setBills(response.data);
          
        } catch (error) {
          console.error("Error fetching bills:", error);
        }
      }
    };

    fetchBills();
  }, [userEmail]);

  const handleChange = (e) => {
    e.preventDefault()
    setBillData({ ...billData, [e.target.name]: e.target.value });
    
  };

  const handleSubmit = async () => {

    if (
      !billData ||
      !billData.customerName || billData.customerName === "undefined" || billData.customerName.trim() === "" ||
      !billData.medicineName || billData.medicineName === "undefined" || billData.medicineName.trim() === "" ||
      !billData.quantity || billData.quantity === "undefined" || billData.quantity.trim() === "" ||
      !billData.manufacturingDate || billData.manufacturingDate === "undefined" || billData.manufacturingDate.trim() === "" ||
      !billData.expiryDate || billData.expiryDate === "undefined" || billData.expiryDate.trim() === "" ||
      !billData.price || billData.price === "undefined" || billData.price.trim() === ""
    ) {
      return alert("Bill is not completely filled");
    }
    


    try {
      const response = await axios.put("http://localhost:3000/api-bills/create", {
        userEmail,
        items: [billData],
      });
      

      setBills([...bills, response.data.bill.items[response.data.bill.items.length - 1]]);
    } catch (err) {
      console.log("Error submitting bill:", err);
    }

    setIsModalOpen(false);
  };

  const handleDelete = async (billId) => {
    try {
      await axios.delete(`http://localhost:3000/api-bills/delete/${billId}`);
      setBills(bills.filter((bill) => bill._id !== billId));
    } catch (error) {
      console.error("Error deleting bill:", error);
    }
  };

  const handleDeleteAll = async () => {
    try {
      await axios.delete("http://localhost:3000/api-bills/delete-all", {
        data: { userEmail }, 
      });

      setBills([]);
    } catch (error) {
      console.error("Error deleting all bills:", error);
    }
  };

  const handleView = (bill) => {
    setSelectedBill(bill);
    // console.log(bill)
  };

  return (
    <div className="dashboard">
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
            <li className="active"><FaFileInvoice /> Billing</li>
            <li onClick={() => navigate("/Stock")}><FaStore /> Stock</li>
            <li onClick={() => navigate("/Profile")}><FaUserCircle /> Profile</li>
          </ul>
        </nav>
        <div className="faq-section">
          <p>Have some questions?</p>
          <button className="faq-btn">Look at the FAQs</button>
        </div>
      </aside>

      <div className="main-content">
        <header className="top-header">
          <h2 className="NAM">{shopName}</h2>
          <div className="user-section">
            <button className="logout-button" onClick={() => dispatch(logout())}>Logout</button>
          </div>
        </header>
        <hr />

        <div className="button-container">      
          <button className="create-bill" onClick={() => setIsModalOpen(true)}>+ Create Bill</button>
          <button className="Delete-all" onClick={handleDeleteAll}><FaTrash/> Delete all</button>
        </div>

        <table className="bill-table">
          <thead>
            <tr>
              <th>Bill No</th>
              <th>Date</th>
              <th>Customer Name</th>
              <th>Total Amount</th>
              <th>Actions</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill, index) => (
              <tr key={bill._id}>
                
                <td>{index + 1}</td>
                <td>{bill.date}</td>
                <td>{bill.customerName}</td>
                <td>₹{bill.price}/-</td>
                <td>
                  <button onClick={() => handleView(bill)}>View</button> 
                </td>
                <td><button onClick={() => handleDelete(bill._id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
            <h3>Manufacturing Date</h3>
            <input type="date" name="manufacturingDate" value={billData.manufacturingDate} onChange={handleChange} required />
            <h3>Expiry Date</h3>
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

      {/* View Bill Modal */}
      {selectedBill && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Bill Details</h2>
            <p className="Details"><strong>Date:</strong> {selectedBill.date}</p>
            <p className="Details"><strong>Customer Name:</strong> {selectedBill.customerName}</p>
            <p className="Details"><strong>Medicine Name:</strong> {selectedBill.medicineName}</p>
            <p className="Details"><strong>Quantity:</strong> {selectedBill.quantity}</p>
            <p className="Details"><strong>MFG Date:</strong> {selectedBill.manufacturingDate}</p>
            <p className="Details"><strong>EXP Date:</strong> {selectedBill.expiryDate}</p>
            <p className="Details"><strong>Price:</strong> ₹{selectedBill.price}/-</p>
            <button onClick={() => setSelectedBill(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Billing;
