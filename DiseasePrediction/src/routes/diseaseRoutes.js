const express = require("express");
const router = express.Router();
const diseaseController = require("../controllers/DiseaseController");

router.post("/predict", diseaseController.getDiseaseDetails);

module.exports = router;
