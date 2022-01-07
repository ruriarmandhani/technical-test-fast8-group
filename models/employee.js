import { DataTypes } from "sequelize";
import sequelize from "../utils/database.js";
import Company from "./company.js";

const Employee = sequelize.define("employee", {
  id: {
    type: DataTypes.INTEGER(10),
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    validate: {
      len: {
        args: [1, 10],
      },
    },
  },
  name: {
    type: DataTypes.CHAR(50),
    allowNull: false,
    validate: {
      len: {
        args: [2, 50],
      },
    },
  },
  email: {
    type: DataTypes.CHAR(255),
    allowNull: false,
    validate: {
      len: {
        args: [5, 255],
      },
    },
  },
  phone_number: {
    type: DataTypes.CHAR(16),
    defaultValue: null,
    allowNull: true,
    validate: {
      len: {
        args: [8, 16],
      },
    },
  },
  jobtitle: {
    type: DataTypes.ENUM("manager", "director", "staff"),
    defaultValue: "staff",
    allowNull: false,
  },
});

Employee.belongsTo(Company, { foreignKey: "company_id" });

export default Employee;
