const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then((db) => {
    console.log("db connected");
  });

app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
