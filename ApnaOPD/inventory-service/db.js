const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./inventory.db");

db.serialize(() => {
  // Categories
  db.run(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE
    );
  `);

  // Items
  db.run(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category_id INTEGER,
      unit TEXT,
      FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
    );
  `);

  // Patient
  db.run(`
  CREATE TABLE IF NOT EXISTS patients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  )
`);

//Prescriptions
db.run(`
  CREATE TABLE IF NOT EXISTS prescriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER,
    item_id INTEGER,
    drug TEXT NOT NULL,
    strength TEXT,
    form TEXT,
    dose TEXT,
    frequency TEXT,
    duration TEXT,
    quantity INTEGER,
    instructions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE SET NULL,
    FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE SET NULL
  )
`);


  // Stock Movements
  db.run(`
    CREATE TABLE IF NOT EXISTS stock_movements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      item_id INTEGER NOT NULL,
      movement_type TEXT NOT NULL CHECK(movement_type IN ('IN','OUT','ADJUST')),
      quantity INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (item_id) REFERENCES items(id)
    );
  `);

  // Indexes
  db.run(`CREATE INDEX IF NOT EXISTS idx_items_category ON items(category_id);`);
  db.run(`CREATE INDEX IF NOT EXISTS idx_stock_item ON stock_movements(item_id);`);
  db.run(`CREATE INDEX IF NOT EXISTS idx_prescription_patient ON prescriptions(patient_id);`);

  // Stock View
  db.run(`
    CREATE VIEW IF NOT EXISTS v_item_stock AS
      SELECT 
        i.id as item_id,
        i.name as item_name,
        COALESCE(SUM(
          CASE 
            WHEN sm.movement_type='IN' THEN sm.quantity
            WHEN sm.movement_type='OUT' THEN -sm.quantity
            WHEN sm.movement_type='ADJUST' THEN sm.quantity
            ELSE 0
          END
        ),0) as stock
      FROM items i
      LEFT JOIN stock_movements sm ON i.id = sm.item_id
      GROUP BY i.id;
  `);
});

module.exports = db;
