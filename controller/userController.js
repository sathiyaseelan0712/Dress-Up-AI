const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ClothesImage = require("../models/ClothesImage");
const PersonImage = require("../models/PersonImage");

const getUserIdFromToken = (req) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.userId;
  } catch (err) {
    throw new Error('Invalid token');
  }
};

exports.register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "User with that email or username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// User login
exports.login = async (req, res) => {
  try {
    const { nameOrEmail, password } = req.body;
    const user = await User.findOne({
      $or: [{ email: nameOrEmail }, { username: nameOrEmail }],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// User: Upload Clothes Image
exports.uploadClothesImage = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const { imageUrl } = req.body;

    const clothesImage = new ClothesImage({
      userId: userId,
      imageUrl,
    });

    await clothesImage.save();
    res.status(201).json({ message: "User clothes image uploaded successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// User: Get All Clothes Images
exports.getUserClothes = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const clothesImages = await ClothesImage.find({ userId: userId });

    if (!clothesImages.length) {
      return res.status(404).json({ message: "No clothes images found" });
    }

    res.status(200).json(clothesImages);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// User: Delete Clothes Image by ID
exports.deleteClothesImageById = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const { id } = req.params;

    const image = await ClothesImage.findOneAndDelete({ _id: id, userId: userId });

    if (!image) {
      return res.status(404).json({ message: "Clothes image not found" });
    }

    res.status(200).json({ message: "Clothes image deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// User: Upload Person Image
exports.uploadPersonImage = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const { imageUrl } = req.body;

    const personImage = new PersonImage({
      userId: userId,
      imageUrl,
    });

    await personImage.save();
    res.status(201).json({ message: "User person image uploaded successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// User: Get All Person Images
exports.getPersonImages = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const personImages = await PersonImage.find({ userId: userId });

    if (!personImages.length) {
      return res.status(404).json({ message: "No person images found" });
    }

    res.status(200).json(personImages);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// User: Delete Person Image by ID
exports.deletePersonImageById = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const { id } = req.params;

    const image = await PersonImage.findOneAndDelete({ _id: id, userId: userId });

    if (!image) {
      return res.status(404).json({ message: "Person image not found" });
    }

    res.status(200).json({ message: "Person image deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
