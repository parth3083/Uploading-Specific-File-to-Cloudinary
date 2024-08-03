const express = require("express");
const cors = require("cors");
require("dotenv").config();
const uploadRoutes = require("./Routes/UploadRoutes"); // Updated import

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Use the combined upload route
app.use("/api", uploadRoutes);

app.listen(3000, () => {
  console.log("http://localhost:3000");
});

