import { sequelize } from "@/config/database";
import { DataTypes } from "sequelize";

const StudentAddition = sequelize.define(
  "StudentAddition",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    horizontalDigits : {
      type: DataTypes.INTEGER,
      defaultValue: null,
      validate: {
        isInt: true, // Ensures the value is an integer
        min: 1,      // Ensures the value is at least 1 (positive number)
        max: 9       // Ensures the value is at most 9 (single digit)
      }
    },
    verticalDigits : {
      type: DataTypes.INTEGER,
      defaultValue: null,
      validate: {
        isInt: true, // Ensures the value is an integer
        min: 1,      // Ensures the value is at least 1 (positive number)
        max: 9       // Ensures the value is at most 9 (single digit)
      }
    },
    totalQuestion : {
      type: DataTypes.INTEGER,
      defaultValue: null,
      validate: {
        isInt: true, // Ensures the value is an integer
        min: 1,      // Ensures the value is at least 1 (positive number)
      }
    },
    question: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    answare: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
  },
  {
    timestamps: true,
    underscored: false,
  }
);

export { StudentAddition };
