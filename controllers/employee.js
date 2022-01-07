import Employee from "../models/employee.js";

export const getEmployeeById = async (req, res) => {
  const employee = await Employee.findByPk(req.params.id, {
    attributes: ["id", "name", "phone_number", "jobtitle"],
  });
  if (!employee)
    return res.status(422).send({
      status: 422,
      code: "422",
      data: null,
      message: "Data is not found",
    });
  res.status(200).send({
    status: 200,
    code: "200",
    data: employee,
    message: "Success",
  });
};

export const deleteEmployeeById = async (req, res) => {
  await Employee.destroy({
    where: { id: req.params.id },
  });
  res.status(204).send();
};
