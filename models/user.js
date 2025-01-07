import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'user',
    },

}, { timestamps: true,

});

const creationTable  =  sequelize.sync().then(() =>{
    console.log("les tables ont été creés avec succces")
}).catch((Error) =>{
      console.log("il ya une erreur lors de la creation de tables")
});

export default User;