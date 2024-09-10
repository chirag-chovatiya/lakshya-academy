import { sequelize } from "@/config/database";
import { DataTypes } from "sequelize";

const StudentReport = sequelize.define(
  "StudenReport",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    studentId : {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    testId : {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    additionMark : {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    subtractionMark : {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    multiplicationMark: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    divisionMark: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    hwStatus: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
    underscored: false,
  }
);

export { StudentReport };
