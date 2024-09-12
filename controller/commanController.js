const axios = require('axios');
const FormData = require('form-data');


exports.uploadClothesAndPersonImages = async (req, res) => {
  try {
    const { clothesImageData, personImageData } = req.body;
    
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
