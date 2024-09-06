import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();


const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_DIALECT } = process.env;
const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT,
    dialectModule: require("mysql2"),
    logging: false
});
const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

sequelize.sync({ alter: true }).then(() => {
  console.log('Sequelize synchronized with the database');
}).catch((err) => {
  console.error('Sequelize synchronization error:', err);
});

export { sequelize, connectDb };

