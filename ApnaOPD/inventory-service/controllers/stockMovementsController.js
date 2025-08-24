const db = require("../db");

exports.getAll = (req, res) => {
  db.all("SELECT * FROM stock_movements ORDER BY created_at DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.create = (req, res) => {
  const { item_id, movement_type, quantity } = req.body;
  if (!item_id || !movement_type || !quantity) {
    return res.status(400).json({ error: "item_id, movement_type, quantity required" });
  }

  // Validate OUT against available stock
  db.get("SELECT stock FROM v_item_stock WHERE item_id=?", [item_id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    const currentStock = row ? row.stock : 0;

    if (movement_type === "OUT" && quantity > currentStock) {
      return res.status(400).json({ error: "Insufficient stock" });
    }

    db.run("INSERT INTO stock_movements(item_id,movement_type,quantity) VALUES(?,?,?)", [item_id, movement_type, quantity], function(err2) {
      if (err2) return res.status(500).json({ error: err2.message });
      res.status(201).json({ id: this.lastID, item_id, movement_type, quantity });
    });
  });
};
