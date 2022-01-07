import Joi from "joi";

export const companyValidation = (data) => {
  const schema = Joi.object({
    company_name: Joi.string().min(3).max(50).required(),
    telephone_number: Joi.string().min(8).max(16),
    address: Joi.string().min(10).max(50),
  });
  return schema.validate(data);
};

export const employeeValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().min(5).max(255).required(),
    phone_number: Joi.string().min(8).max(16),
    jobtitle: Joi.string().valid("manager", "director", "staff"),
  });
  return schema.validate(data);
};
