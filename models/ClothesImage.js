const mongoose = require("mongoose");

const clothesImageSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, 
    imageUrl: { type: String, required: true }, 
  },
  { timestamps: true }
);

const ClothesImage = mongoose.model("ClothesImage", clothesImageSchema);
module.exports = ClothesImage;
