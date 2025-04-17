const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const multer = require('multer');
const path = require('path');
const cors = require("cors");
// const http = require('http');
// const { Server } = require('socket.io');
// const Message = require("./models/message");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Middlewares
app.use(cors({
  origin: "https://her-venture.vercel.app",
  credentials: true
}));

app.use(express.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Limit file size to 1MB
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
}).single('image'); // 'image' is the name attribute in your HTML form

// Check file type function
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images only!');
  }
}

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Test Route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// File upload route
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.send(err);
    } else {
      if (req.file == undefined) {
        res.send('Error: No file selected!');
      } else {
        res.send(`File uploaded: ${req.file.filename}`);
      }
    }
  });
});

// API Routes
// app.use("/api/messages", require("./routes/messageRoutes.js"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/entrepreneur", require("./routes/entrepreneurRoutes"));
app.use("/api/labor", require("./routes/laborRoutes"));
app.use("/api/landowner", require("./routes/landownerRoutes"));
app.use("/api/post", require("./routes/postRoutes"));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
