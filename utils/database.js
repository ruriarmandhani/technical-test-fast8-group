import { Sequelize } from "sequelize";

// database connection
const sequelize = new Sequelize(
  "payuung_dev", // database name
  "root", // username
  "123456789", // password
  {
    host: "localhost", // host
    dialect: "mysql",
  }
);

export default sequelize;
