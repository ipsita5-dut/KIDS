const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const multer = require("multer");
const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save images in "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  }
});

const upload = multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB limit
// Signup Route
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate Token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.status(200).json({ success: true, message: "Login successful", email: user.email, token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Logout Route
router.post("/logout", (req, res) => {
  res.cookie("token", "", { expires: new Date(0) }).json({ message: "Logged out" });
});


const DetailedUser = require("../models/DetailedUser");

// Get user profile by email (from localStorage)
router.get("/profile", async (req, res) => {
  try {
    const { email } = req.query;
    console.log(email); // Email is passed as a query parameter
    if (!email) return res.status(400).json({ error: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });
    const user2=await DetailedUser.findOne({ email });
    if(!user2){
      DetailedUser.insertOne({username: user.username,email});
      res.json(user);
    }
    else
    res.json(user2);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Update user profile
router.put("/profile", async (req, res) => {
  try {
    const { email, ...updateData } = req.body; // Email & update fields

    if (!email) return res.status(400).json({ error: "Email is required" });
    
    const updatedUser = await DetailedUser.findOneAndUpdate(
      { email },
      updateData,
      { new: true, upsert: true }
    );

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
