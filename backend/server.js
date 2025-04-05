const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Middlewares
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Routes
app.use("/api/entrepreneurs", require("./routes/entrepreneurRoutes"));
app.use("/api/labours", require("./routes/laborRoutes"));
// Start server
app.listen(5000, () => console.log("Server running on port 5000"));
