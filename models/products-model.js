    const mongoose = require('mongoose');
    const productSchema = new mongoose.Schema({
      productName: {
        type: String,
        required: true,
      },
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
    },
    
      price: {
        type: Number,
        required: true,
      },

      size: {
        type: String,
        required: true,
        enum: ['small', 'medium', 'large'],
      },

      description: {
        type: String,
        required: false,
      },

      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', 
        required: true,
      },

      carbs: {
        type: Number,
        required: false,
      },

      image: {
        type: String,
        required: true,
      },
    });
    
    module.exports = mongoose.model('Product', productSchema);
    

module.exports=mongoose.model('Product',productSchema)
