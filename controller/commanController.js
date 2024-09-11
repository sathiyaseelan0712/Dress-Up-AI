const ClothesImage = require('../models/ClothesImage');
const PersonImage = require('../models/PersonImage');
const DefaultClothesImage = require('../models/ClothesDefault');
const DefaultPersonImage = require('../models/PersonDefault');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const FormData = require('form-data');

const getUserIdFromToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.userId;
  } catch (err) {
    return null; 
  }
};

exports.uploadClothesAndPersonImages = async (req, res) => {
  try {
    const { clothesImageData, personImageData } = req.body;
    const token = req.headers.authorization?.split(' ')[1]; 
    
    const userId = token ? getUserIdFromToken(token) : null;
    if (userId) {
      const clothesImage = new ClothesImage({
        userId,
        imageData: clothesImageData,
      });
      const personImage = new PersonImage({
        userId,
        imageData: personImageData,
      });
      await clothesImage.save();
      await personImage.save();
    } else {
      const defaultClothesImage = new DefaultClothesImage({
        imageData: clothesImageData,
      });
      const defaultPersonImage = new DefaultPersonImage({
        imageData: personImageData,
      });
      await defaultClothesImage.save();
      await defaultPersonImage.save();
    }

    const formData = new FormData();
    formData.append('clothesImage', clothesImageData);
    formData.append('personImage', personImageData);

    const apiResponse = await axios.post(process.env.EXTERNAL_API_URL, formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    res.status(201).json({
      message: 'Images uploaded successfully and sent to external API',
      apiResponse: apiResponse.data,
    });
  } catch (err) {
    console.error('Error uploading images:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
