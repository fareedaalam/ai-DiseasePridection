const db = require("../db");

exports.getAll = (req, res) => {
  const sql = `
    SELECT p.*, l.item_id, l.quantity 
    FROM prescriptions p
    LEFT JOIN prescription_lines l ON p.id = l.prescription_id
  `;
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.create = (req, res) => {
  const { patient_id, lines } = req.body;
  if (!patient_id || !Array.isArray(lines)) {
    return res.status(400).json({ error: "patient_id and lines[] required" });
  }

  db.serialize(() => {
    db.run("BEGIN");
    db.run("INSERT INTO prescriptions(patient_id) VALUES (?)", [patient_id], function(err) {
      if (err) {
        db.run("ROLLBACK");
        return res.status(500).json({ error: err.message });
      }
      const prescriptionId = this.lastID;

      const stmt = db.prepare("INSERT INTO prescription_lines(prescription_id,item_id,quantity) VALUES (?,?,?)");
      for (let l of lines) {
        stmt.run([prescriptionId, l.item_id, l.quantity]);
        // Also subtract stock (OUT movement)
        db.run("INSERT INTO stock_movements(item_id,movement_type,quantity) VALUES(?,?,?)", [l.item_id, 'OUT', l.quantity]);
      }
      stmt.finalize();

      db.run("COMMIT", (err2) => {
        if (err2) return res.status(500).json({ error: err2.message });
        res.status(201).json({ id: prescriptionId, patient_id, lines });
      });
    });
  });
};
