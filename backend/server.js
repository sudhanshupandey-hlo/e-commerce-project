const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// Product API
app.use("/api/products", productRoutes);

// Frontend
app.use(express.static(path.join(__dirname, "../frontend")));

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});