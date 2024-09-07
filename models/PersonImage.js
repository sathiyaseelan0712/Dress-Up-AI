const mongoose = require("mongoose");

const personImageSchema = new mongoose.Schema(
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

const PersonImage = mongoose.model("PersonImage", personImageSchema);
module.exports = PersonImage;
