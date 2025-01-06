import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';


const Articles = sequelize.define('Articles', {
    sourceId: {
        type: DataTypes.STRING,
        allowNull: true
    },
    sourceName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: true
        }
    },
    urlToImage: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isUrl: true
        }
    },
    publishedAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'articles',
    timestamps: false
});

export default Articles;