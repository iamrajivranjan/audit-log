require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const indexRoutes = require("./routes");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use("/api", indexRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.listen(PORT, "127.0.0.1", () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
