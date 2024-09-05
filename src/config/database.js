// import { Sequelize } from 'sequelize';
// import dotenv from 'dotenv';
// dotenv.config();

// const sequelize = new Sequelize({
//   host: process.env.DB_HOST,
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   dialect: process.env.DB_DIALECT,
//   logging: false,
//   dialectModule: require('mysql2'),
//   benchmark: true,
// });

// async function connectDb() {
//   try {
//     await sequelize.authenticate();
//     console.log('Connection to the database has been established successfully.');
//     await sequelize.sync({ alter: true });
//     console.log('Database and tables are created.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// }

// export { sequelize, connectDb };

import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  dialect: process.env.DB_DIALECT,
  logging: false,
  dialectModule: require("mysql2"),
  benchmark: true,
});

async function connectDb() {}
async function test() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );
    await sequelize.sync({ alter: true });
    console.log("Database and tables are created.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

export { sequelize, connectDb };

