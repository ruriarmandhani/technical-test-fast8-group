import { DataTypes } from "sequelize";
import sequelize from "../utils/database.js";

const Company = sequelize.define("company", {
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
  company_name: {
    type: DataTypes.CHAR(50),
    allowNull: false,
    validate: {
      len: {
        args: [3, 50],
      },
    },
  },
  telephone_number: {
    type: DataTypes.CHAR(16),
    defaultValue: null,
    allowNull: true,
    validate: {
      len: {
        args: [8, 16],
      },
    },
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  address: {
    type: DataTypes.CHAR(50),
    allowNull: true,
    validate: {
      len: {
        args: [10, 50],
      },
    },
  },
});

export default Company;
