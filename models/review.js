const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true, 
  },
  review: {
    type: String,
    required: true, 
  },
});

module.exports = mongoose.model('Review', reviewSchema);
