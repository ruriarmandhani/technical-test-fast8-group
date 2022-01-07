import Company from "../models/company.js";
import Employee from "../models/employee.js";
import { companyValidation, employeeValidation } from "../utils/validation.js";

// Add company
export const addCompany = async (req, res) => {
  // Validate data before adding a new company
  const { error, value } = companyValidation(req.body);
  if (error)
    return res.status(400).send({
      status: 400,
      code: "400",
      data: null,
      message: error.details[0].message.replace(/"/g, ""),
    });

  // Check if company exist
  const companyExist = await Company.findOne({
    where: { company_name: req.body.company_name },
  });

  if (companyExist)
    return res.status(409).send({
      status: 409,
      code: "409",
      data: null,
      message: "Company Name already exist",
    });

  try {
    const company = await Company.create(req.body);
    const savedCompany = await company.save();
    // console.log(savedCompany)
    res.status(201).send({
      status: 201,
      code: "201",
      data: {
        id: savedCompany.id,
      },
      message: "Success",
    });
  } catch (error) {
    res.send(error);
  }
};

// Get companies
export const getCompanies = async (req, res) => {
  const companies = await Company.findAll();
  if (companies.length < 1)
    return res.status(422).send({
      status: 422,
      code: "422",
      data: companies,
      message: "Data is not found",
    });

  res.status(200).send({
    status: 200,
    code: "200",
    data: companies,
    message: "Success",
  });
};

// Set company active
export const setCompanyActive = async (req, res) => {
  const company = await Company.findByPk(req.params.id);
  if (!company)
    return res.status(422).send({
      status: 422,
      code: "422",
      data: null,
      message: "Data is not found",
    });

  if (company.is_active)
    return res.status(400).send({
      status: 400,
      code: "400",
      data: null,
      message: "Company is already active",
    });

  company.is_active = true;
  const savedCompany = await company.save();
  // console.log(savedCompany);
  res.status(200).send({
    status: 200,
    code: "200",
    data: {
      id: savedCompany.id,
      is_active: savedCompany.is_active,
    },
    message: "Success",
  });
};

// Add employee
export const addEmployee = async (req, res) => {
  // Validate data before adding a new employee
  const { error, value } = employeeValidation(req.body);
  if (error)
    return res.status(400).send({
      status: 400,
      code: "400",
      data: null,
      message: error.details[0].message.replace(/"/g, ""),
    });

  // Check if email already exists
  const emailExist = await Employee.findOne({
    where: { email: req.body.email },
  });
  if (emailExist)
    return res.status(409).send({
      status: 409,
      code: "409",
      data: null,
      message: "Email already exists",
    });

  try {
    const employee = await Employee.create({
      name: req.body.name,
      email: req.body.email,
      phone_number: req.body.phone_number,
      jobtitle: req.body.jobtitle,
      company_id: req.params.company_id,
    });

    const savedEmployee = await employee.save();
    // console.log(savedEmployee);
    res.status(201).send({
      status: 201,
      code: "201",
      data: {
        id: savedEmployee.id,
        company_id: savedEmployee.company_id,
      },
      message: "Success",
    });
  } catch (error) {
    res.send(error);
  }
};

// Get employees by company id
export const getEmployeesByCompanyId = async (req, res) => {
  const employees = await Employee.findAll({
    where: { company_id: req.params.id },
  });
  if (employees.length < 1)
    return res.status(422).send({
      status: 422,
      code: "422",
      data: null,
      message: "Data is not found",
    });

  const company = await Company.findByPk(req.params.id);
  res.status(200).send({
    status: 200,
    code: "200",
    data: {
      id: company.id,
      company_name: company.company_name,
      is_active: company.is_active,
      employees: employees,
    },
    message: "Success",
  });
};

// Update employee
export const updateEmployee = async (req, res) => {
  // Validate data before adding a new employee
  const { error, value } = employeeValidation(req.body);
  if (error)
    return res.status(400).send({
      status: 400,
      code: "400",
      data: null,
      message: error.details[0].message.replace(/"/g, ""),
    });

  // Check if email already exists
  if (req.body.email) {
    const emailExist = await Employee.findOne({
      where: { email: req.body.email, id: { $not: req.params.employee_id } },
    });
    if (emailExist)
      return res.status(409).send({
        status: 409,
        code: "409",
        data: null,
        message: "Email already exists",
      });
  }

  try {
    const updatedEmployee = await Employee.update(req.body, {
      where: {
        id: req.params.employee_id,
        company_id: req.params.company_id,
      },
    });
    console.log(updatedEmployee);
    res.status(201).send({
      status: 201,
      code: "201",
      data: {
        id: req.params.employee_id,
        company_id: req.params.company_id,
      },
      message: "Success",
    });
  } catch (error) {
    res.send(error);
  }
};
