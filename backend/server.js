const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const multer = require('multer');
const path = require('path');
const cors = require("cors");
const http = require('http');
const { Server } = require('socket.io');

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Middlewares
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(express.json());
// Test Route

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"], // Your frontend URL
    methods: ['GET', 'POST']
  }
});

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('send-message', (data) => {
    io.to(data.receiverId).emit('receive-message', data);
  });

  socket.on('join-room', (userId) => {
    socket.join(userId); // Join personal room based on userId
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});


app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/entrepreneur", require("./routes/entrepreneurRoutes"));
app.use("/api/labor", require("./routes/laborRoutes"));
app.use("/api/landowner", require("./routes/landownerRoutes"));
app.use("/api/post",require("./routes/postRoutes"));
// Start server
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
server.listen(5000, () => console.log("Server running on port 5000"));

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

// Check file type
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





