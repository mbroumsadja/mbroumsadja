import sequelize from "../data/config.js";
import { DataTypes } from "sequelize";

const Commentaire = sequelize.define('Commentaire', {
  auteur: DataTypes.STRING,
  commentaire: DataTypes.TEXT
}, { tableName: 'commentaire', timestamps: true });


export default Commentaire