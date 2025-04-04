const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();
connectDB();

const cors = require("cors");
app.use(cors({ origin: "http://localhost:3000", credentials: true }));


app.get("/",(req,res)=>{
    res.send("backend is running");
});

app.use(express.json());
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/entrepreneurs", require("./routes/entrepreneurRoutes"));
app.use("/api/labor", require("./routes/laborRoutes"));
app.use("/api/landowners", require("./routes/landownerRoutes"));

app.listen(5000, () => console.log("Server running on port 5000"));
