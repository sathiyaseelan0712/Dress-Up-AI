const mongoose = require('mongoose');

const defaultPersonImageSchema = new mongoose.Schema({
  
  imageData: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const DefaultPersonImage = mongoose.model('DefaultPersonImage', defaultPersonImageSchema);

module.exports = DefaultPersonImage;
