import { sequelize } from "@/config/database";
import { DataTypes } from "sequelize";

const User = sequelize.define(
  "users",
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
      unique: true,
      defaultValue: null,
    },
    password: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    phone_number: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    type: {
      type: DataTypes.ENUM("Normal", "Admin", "Google"),
      defaultValue: null,
    },
    status: {
      type: DataTypes.ENUM("Active", "Inactive","Delete"),
      defaultValue: "Active",
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
