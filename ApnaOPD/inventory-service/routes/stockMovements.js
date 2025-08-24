const express = require("express");
const ctrl = require("../controllers/stockMovementsController");
const router = express.Router();

router.get("/", ctrl.getAll);
router.post("/", ctrl.create);

module.exports = router;
