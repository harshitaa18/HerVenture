// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

const Entrepreneur = require("../models/Entrepreneur");
const Labor = require("../models/Labor");
const Landowner = require("../models/Landowner");
// Add Supplier if you have it

const getUserByRoleAndId = async (role, id) => {
  switch (role) {
    case "entrepreneur":
      return await Entrepreneur.findById(id)
    case "labor":
      return await Labor.findById(id);
    case "landowner":
      return await Landowner.findById(id);
    default:
      return null;
  }
};

const getProfileByRoleAndId = async (req, res) => {
  const { role, id } = req.params;
  try {
    const user = await getUserByRoleAndId(role, id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getProfileByRoleAndId };


// exports.signup = async (req, res) => {
//   try {
//     const { name, email, contact, password, role } = req.body;

//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ error: "Email already registered" });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = await User.create({
//       name,
//       email,
//       contact,
//       password: hashedPassword,
//       role,
//     });

//     const token = jwt.sign({ userId: newUser._id, role: newUser.role }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });

//     res.status(201).json({ token, user: { id: newUser._id, name: newUser.name, role: newUser.role } });
//   } catch (err) {
//     res.status(500).json({ error: "Signup failed" });
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (!user) return res.status(400).json({ error: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

//     const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });

//     res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
//   } catch (err) {
//     res.status(500).json({ error: "Login failed" });
//   }
// };
