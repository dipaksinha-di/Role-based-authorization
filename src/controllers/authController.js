const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

//REGISTER CONTROLLER
const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // CHECK IF USER ALREADY EXISTS
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({
        error: "Username already exists",
      });
    }

    //HASHING THE PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //CREATE A NEW USER
    const newUser = new User({ username, password: hashedPassword, role });

    await newUser.save();
    res.status(201).json({
      message: `User registered successfully with username ${username}`,
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//LOGIN CONTROLLER
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    //CHECK IF USER EXISTS
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "Invalid username or password" });
    }

    //CHECK IF PASSWORD IS CORRECT
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    //CREATE AND ASSIGN A TOKEN
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { register, login };
