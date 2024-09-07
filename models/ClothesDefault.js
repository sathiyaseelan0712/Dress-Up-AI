const mongoose = require('mongoose');

const defaultClothesImageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const DefaultClothesImage = mongoose.model('DefaultClothesImage', defaultClothesImageSchema);

module.exports = DefaultClothesImage;
