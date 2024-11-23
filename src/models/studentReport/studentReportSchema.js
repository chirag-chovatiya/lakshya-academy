import { sequelize } from "@/config/database";
import { DataTypes } from "sequelize";
import { User } from "../users/userSchema";

const StudentReport = sequelize.define(
  "StudenReport",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    studentId: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    testId: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    additionMark: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    subtractionMark: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    multiplicationMark: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    divisionMark: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    result: {
      type: DataTypes.STRING,
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

StudentReport.belongsTo(User, { foreignKey: "studentId", as: "student" });


export { StudentReport };

