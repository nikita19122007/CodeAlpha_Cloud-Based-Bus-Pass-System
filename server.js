require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Default Route
app.get("/", (req, res) => {
    res.json({
        project: "Cloud Based Bus Pass System",
        status: "Server Running Successfully",
        version: "1.0.0"
    });
});

// Future Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/pass", passRoutes);
// app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on Port ${PORT}`);
});
