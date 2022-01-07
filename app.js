import express from "express";
import dotenv from "dotenv";

// Import Routes
import fibonacci from "./routes/fibonacci.js";
import combination from "./routes/combination.js";
import companyRoutes from "./routes/company.js";
import employeeRoutes from "./routes/employee.js";
import countryRoutes from "./routes/country.js";

// Database
import sequelize from "./utils/database.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

// test database connection
try {
  await sequelize.authenticate();
  console.log("Database connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

// sync database
await sequelize.sync();
console.log("All models were synchronized successfully.");

// Middleware
app.use(express.json());

// Route middleware
app.use("/api/fibonacci", fibonacci);
app.use("/api/combination", combination);
app.use("/api/companies", companyRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/countries", countryRoutes);

app.get("/", (req, res) => {
  res.send("API is ready!");
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
