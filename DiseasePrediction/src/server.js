require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const diseaseRoutes = require("./routes/diseaseRoutes");

const app = express();
app.use(bodyParser.json());

// Routes
app.use("/api/disease", diseaseRoutes);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Disease Prediction Microservice running on port ${PORT}`);
});
