import sequelize from "../data/config.js";
import { DataTypes } from "sequelize";

const Client = sequelize.define('Client', {
  nom: DataTypes.STRING,
  prenom: DataTypes.STRING,
  email: DataTypes.STRING,
  mot_de_passe: DataTypes.STRING,
  role: {
    type: DataTypes.ENUM('user', 'admin'),
    defaultValue: 'user'
  }
}, { tableName: 'client', timestamps: false });

export default Client