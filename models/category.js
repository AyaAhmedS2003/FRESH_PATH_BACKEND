const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  description: {
    type: String,
    required: false, 
  },
  image: {
    type: String,
    required: true, 
  },
  price: {
    type: Number,
    required:true, 
  },
});

module.exports = mongoose.model('Category', categorySchema);
