const mongoose = require('mongoose');
const validator = require('validator');


const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: [validator.isEmail, 'Field must be a valid email address']
  },
  password: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    required: false
  },
  height: {
    type: Number,
    required: false
  },
  address: {
    street: String,
    city: String,
   
  },
  
  diet: {
    type: String,
    enum: ['vegetarian', 'vegan', 'keto', 'balanced', 'low-carb'], 
    required: false
  }
});

    



module.exports=mongoose.model('User',UserSchema);
