const cors = require("cors");
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const diseaseRoutes = require("./routes/diseaseRoutes");

const app = express();
app.use(bodyParser.json());
app.use(cors()); // allow all origins
// OR app.use(cors({ origin: "http://localhost:5173" })); // restrict to React app

app.use(express.json());

// Routes
app.use("/api/disease", diseaseRoutes);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Disease Prediction Microservice running on port ${PORT}`);
});
