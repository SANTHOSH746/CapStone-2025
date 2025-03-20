const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true
  },
  items: [
    {
      medicineName: {
        type: String,
        required: true
      },
      customerName: {
        type: String,
        required: true
      },
      date:{
        type: Date,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      expiryDate: {
        type: Date,
        required: true
      },
      manufacturingDate: {
        type: Date,
        required: true
      },
      
      price: {
        type: Number,
        required: true
      }
    }
  ]
});

const Bill = mongoose.model("Bill", billSchema);
module.exports = Bill;
