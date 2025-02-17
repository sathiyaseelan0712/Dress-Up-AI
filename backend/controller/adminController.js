const DefaultClothesImage = require('../models/ClothesDefault');
const DefaultPersonImage = require('../models/PersonDefault');

// Upload Admin Clothes Image
exports.uploadDefaultClothesImage = async (req, res) => {
  try {
    const { imageData } = req.body;
    const defaultClothesImage = new DefaultClothesImage({
      imageData,
    });
    await defaultClothesImage.save();
    res.status(201).json({ message: "Default clothes image uploaded successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
// Get All Default Clothes Images
exports.getDefaultClothesImages = async (req, res) => {
  try {
    const clothesImages = await DefaultClothesImage.find();
    res.status(200).json(clothesImages);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Admin: Delete Default Clothes Image by ID
exports.deleteDefaultClothesImageById = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedImage = await DefaultClothesImage.findByIdAndDelete(id);
  
      if (!deletedImage) {
        return res.status(404).json({ message: "Clothes image not found" });
      }
  
      res.status(200).json({ message: "Default clothes image deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  };

// Upload Admin Person Image
exports.uploadDefaultPersonImage = async (req, res) => {
  try {
    const { imageData } = req.body;
    const defaultPersonImage = new DefaultPersonImage({
      imageData,
    });
    await defaultPersonImage.save();
    res.status(201).json({ message: "Default person image uploaded successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get All Default Person Images
exports.getDefaultPersonImages = async (req, res) => {
  try {
    const personImages = await DefaultPersonImage.find();
    res.status(200).json(personImages);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Admin: Delete Default Person Image by ID
exports.deleteDefaultPersonImageById = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedImage = await DefaultPersonImage.findByIdAndDelete(id);
  
      if (!deletedImage) {
        return res.status(404).json({ message: "Person image not found" });
      }
  
      res.status(200).json({ message: "Default person image deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  };
