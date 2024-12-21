const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true, 
  },
  members: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      }
    }
  ]
});

module.exports = mongoose.model('Team', teamSchema);
