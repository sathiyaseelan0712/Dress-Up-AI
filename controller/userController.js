const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ClothesImage = require("../models/ClothesImage");
const PersonImage = require("../models/PersonImage");

exports.register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    // console.log(req.body);
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with that email or username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    // console.log(newUser);
    await newUser.save();
    // console.log("saved Success");
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
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error("Error during login:", err.message || err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Upload clothes image
exports.uploadClothesImage = async (req, res) => {
  try {
    const { imageUrl } = req.body;
    const clothesImage = new ClothesImage({
      userId: req.user.userId,
      imageUrl,
    });
    await clothesImage.save();
    res.status(201).json({ message: "Clothes image uploaded successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Upload person image
exports.uploadPersonImage = async (req, res) => {
  try {
    const { imageUrl } = req.body;
    const personImage = new PersonImage({
      userId: req.user.userId,
      imageUrl,
    });
    await personImage.save();
    res.status(201).json({ message: "Person image uploaded successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getRecentImages = async (req, res) => {
  try {
    const clothesImages = await ClothesImage.find({ userId: req.user.userId })
      .sort({ createdAt: -1 })
      .limit(5);
    const personImages = await PersonImage.find({ userId: req.user.userId })
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({ clothesImages, personImages });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
