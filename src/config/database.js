import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
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
const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

sequelize.sync({ alter: false }).then(() => {
  console.log('Sequelize synchronized with the database');
}).catch((err) => {
  console.error('Sequelize synchronization error:', err);
});

export { sequelize, connectDb };


// import { Sequelize } from "sequelize";
// import dotenv from "dotenv";
// dotenv.config();
// const sequelize = new Sequelize({
//   host: process.env.DB_HOST,
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   dialect: process.env.DB_DIALECT,
//   logging: false,
//   dialectModule: require("mysql2"),
//   benchmark: true,
// });

// const connectDb = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// };

// sequelize.sync({ alter: true }).then(() => {
//   console.log('Sequelize synchronized with the database');
// }).catch((err) => {
//   console.error('Sequelize synchronization error:', err);
// });

// export { sequelize, connectDb };
