const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection (NO .env)
mongoose
  .connect(
    "mongodb+srv://<USERNAME>:<PASSWORD>@<CLUSTER_URL>/<DATABASE_NAME>"
  )
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

// Server start
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
