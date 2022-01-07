import express from "express";
import {
  getEmployeeById,
  deleteEmployeeById,
} from "../controllers/employee.js";

const router = express.Router();

// Get employee by id
router.get("/:id", getEmployeeById);

// Delete employee by id
router.delete("/:id", deleteEmployeeById);

export default router;
