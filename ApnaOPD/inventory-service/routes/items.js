const express = require("express");
const ctrl = require("../controllers/itemsController");
const router = express.Router();

router.get("/", ctrl.getAll);
router.get("/:id/stock", ctrl.getStock);
router.post("/", ctrl.create);
router.put("/:id", ctrl.update);
router.delete("/:id", ctrl.remove);

module.exports = router;
