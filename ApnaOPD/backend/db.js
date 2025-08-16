import sqlite3 from "sqlite3";

// Create and open database
const db = new sqlite3.Database("./opd.db", (err) => {
  if (err) {
    console.error("Error opening database", err.message);
  } else {
    console.log("Connected to SQLite database");
    db.run(`
      CREATE TABLE IF NOT EXISTS opd (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        age INTEGER,
        gender TEXT,
        contact TEXT,
        email TEXT,
        symptoms TEXT,
        findings TEXT NULL,
        appointment_date TEXT
      )
    `);
  }
});

export default db;
