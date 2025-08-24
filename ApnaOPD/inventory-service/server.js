const express = require("express");
const cors = require("cors");
const app = express();

const categoriesRoutes = require("./routes/categories");
const itemsRoutes = require("./routes/items");
const prescriptionsRoutes = require("./routes/prescriptions");
const stockMovementsRoutes = require("./routes/stockMovements");

app.use(cors());
app.use(express.json());

// Mount routes
app.use("/api/categories", categoriesRoutes);
app.use("/items", itemsRoutes);
app.use("/prescriptions", prescriptionsRoutes);
app.use("/stock-movements", stockMovementsRoutes);

const PORT = 6000;
app.listen(PORT, () => {
  console.log(`Inventory service running on http://localhost:${PORT}`);
});
