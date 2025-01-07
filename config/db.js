import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// import { Pool } from 'pg';

// dotenv.config();

// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//     host: process.env.DB_HOST,
//     dialect: 'mariadb',
// });

// export default sequelize;

const sequelize = new Sequelize(process.env.DATABASE_URL,{
    dialect: 'postgres', 
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false 
        }
    },

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

export default sequelize;
