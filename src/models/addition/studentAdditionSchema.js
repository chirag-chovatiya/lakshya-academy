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
    teacher_id: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    totalQuestion : {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    addition: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    subtraction: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    multiplication: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    division: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    level: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    underscored: false,
  }
);

export { StudentAddition };



