import { sequelize } from "@/config/database";
import { DataTypes } from "sequelize";

const AdminAdv = sequelize.define(
  "AdminAdvertisement",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: DataTypes.TEXT,
      defaultValue: "",
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
    underscored: false,
  }
);



export { AdminAdv };

