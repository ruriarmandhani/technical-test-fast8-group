import express from "express";

import {
  addCompany,
  getCompanies,
  setCompanyActive,
  getEmployeesByCompanyId,
  addEmployee,
  updateEmployee,
} from "../controllers/company.js";

const router = express.Router();

// get companies
router.get("/", getCompanies);

// get employees by company id
router.get("/:id/employees", getEmployeesByCompanyId);

// add company
router.post("/", addCompany);

// add employee in a company
router.post("/:company_id/employees", addEmployee);

// set company active
router.put("/:id/set_active", setCompanyActive);

// update employee
router.put("/:company_id/employees/:employee_id", updateEmployee);

export default router;
