const db = require("../db");

exports.getAll = (req, res) => {
  const sql = `
    SELECT i.*, v.stock 
    FROM items i
    LEFT JOIN v_item_stock v ON i.id = v.item_id;
  `;
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.getStock = (req, res) => {
  db.get("SELECT stock FROM v_item_stock WHERE item_id=?", [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row || { stock: 0 });
  });
};

exports.create = (req, res) => {
  const { name, category_id, unit } = req.body;
  if (!name) return res.status(400).json({ error: "Name required" });

  db.run("INSERT INTO items(name,category_id,unit) VALUES(?,?,?)", [name, category_id, unit], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, name, category_id, unit });
  });
};

exports.update = (req, res) => {
  const { id } = req.params;
  const { name, category_id, unit } = req.body;
  db.run("UPDATE items SET name=?, category_id=?, unit=? WHERE id=?", [name, category_id, unit, id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ updated: this.changes });
  });
};

exports.remove = (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM items WHERE id=?", [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
};
