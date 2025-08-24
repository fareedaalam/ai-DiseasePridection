const express = require("express");
const ctrl = require("../controllers/prescriptionsController");
const router = express.Router();

router.get("/", ctrl.getAll);
router.post("/", ctrl.create);

module.exports = router;
