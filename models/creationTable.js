import sequelize from "../config/db";

 const creationTable  =  sequelize.sync().then(() =>{
    console.log("les tables ont été creés avec succces")
}).catch((Error) =>{
      console.log("il ya une erreur lors de la creation de tables")
});

export default creationTable;