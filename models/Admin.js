import sequelize from "../data/config.js";
import { DataTypes } from "sequelize";

const Admin = sequelize.define('Admin', {
  nom: DataTypes.STRING,
  mots_passe: DataTypes.STRING
}, { tableName: 'admin', timestamps: false });

export default Admin