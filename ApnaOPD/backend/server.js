import express from "express";
import cors from "cors";
import db from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

// Save OPD entry
app.post("/api/opd", (req, res) => {
  const { name, age, gender, contact, email, symptoms, findings, appointment_date } = req.body;
  const sql = `
    INSERT INTO opd (name, age, gender, contact, email, symptoms, findings, appointment_date)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.run(sql, [name, age, gender, contact, email, symptoms, findings, appointment_date], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Data saved successfully", id: this.lastID });
  });
});

// Get all OPD entries
app.get("/api/opd", (req, res) => {
  db.all("SELECT * FROM opd order by appointment_date desc", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// GET a single patient record by ID
app.get("/api/opd/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM opd WHERE id = ?";

  db.get(sql, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ message: "Record not found" });
    }
    res.json(row);
  });
});

app.put("/api/opd/:id", (req, res) => {
  const { id } = req.params;
  const { name, age, gender, contact, email, symptoms, findings, appointment_date } = req.body;

  const sql = `
    UPDATE opd 
    SET name = ?, age = ?, gender = ?, contact = ?, email = ?, symptoms = ?, findings = ?, appointment_date = ?
    WHERE id = ?
  `;

  db.run(
    sql,
    [name, age, gender, contact, email, symptoms, findings, appointment_date, id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (this.changes === 0) {
        // ✅ No row updated
        return res.status(404).json({ message: "Record not found or no changes made" });
      }

      // ✅ Successfully updated
      res.json({ message: "Data updated successfully", updatedRows: this.changes });
    }
  );

});




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
