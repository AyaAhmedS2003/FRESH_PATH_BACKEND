const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true, 
  },
  quantity: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  
  orderDate: {
    type: Date,
    default: Date.now, 
  }
});

module.exports = mongoose.model('Order', orderSchema);
