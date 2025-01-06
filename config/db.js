// import { Sequelize } from 'sequelize';
// import dotenv from 'dotenv';
// import { Pool } from 'pg';

// dotenv.config();

// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//     host: process.env.DB_HOST,
//     dialect: 'mariadb',
// });

// export default sequelize;

const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT, 
        dialectOptions: {
            ssl: {
                require: true, 
                rejectUnauthorized: false, 
            },
        },
        logging: false, 
    }
);


sequelize
    .authenticate()
    .then(() => console.log('Connexion à PostgreSQL réussie avec Sequelize !'))
    .catch(err => console.error('Erreur de connexion à PostgreSQL :', err));

export default sequelize;
