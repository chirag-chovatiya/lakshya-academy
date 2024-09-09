import { sequelize } from "@/config/database";
import { DataTypes } from "sequelize";

const StudentAddition = sequelize.define(
  "StudentTest",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    horizontalDigits : {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    subDigits : {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    verticalDigits : {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    totalQuestion : {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    question: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    level: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    type: {
      type: DataTypes.ENUM("addition","subtraction","multiplication", "division"),
      defaultValue: null,
    },
  },
  {
    timestamps: true,
    underscored: false,
  }
);

export { StudentAddition };
