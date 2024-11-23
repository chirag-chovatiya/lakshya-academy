import { sequelize } from "@/config/database";
import { DataTypes } from "sequelize";

const User = sequelize.define(
  "students",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
    },
    password: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    phone_number: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    level: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    user_type: {
      type: DataTypes.ENUM("Student", "Admin", "Teacher"),
      defaultValue: "Student",
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    images: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
  },
  {
    timestamps: true,
    underscored: false,
  }
);

export { User };
