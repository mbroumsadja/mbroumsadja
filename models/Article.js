import sequelize from "../data/config.js";
import { DataTypes } from "sequelize";

const Article = sequelize.define('Article', {
  titre: DataTypes.STRING,
  corps: DataTypes.TEXT,
  auteur: DataTypes.STRING,
  reference: DataTypes.TEXT,
  categorie: DataTypes.STRING,
  lien_image: DataTypes.STRING
}, { tableName: 'article', timestamps: true });

export default Article