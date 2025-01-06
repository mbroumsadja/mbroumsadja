import { where } from "sequelize";
import User from "../models/user.js";

export const saveUser = async (req, res , next) =>{
    try {
        const user =  await User.create(req.body);
        req.session.user = user.username;
        req.session.role = user.role;
        res.redirect('/');
        return
    
    } catch (error) {
        
        console.log(`erreur lors de l'enregistrement`,error)
    }
}

export const verifierUser = async (req, res , next) =>{
    try {
        const password = req.body.password
        const users =  await User.findOne({
            where:{password}
        });
        req.session.user = users.username;
        res.redirect('/');
        return
    
    } catch (error) {
        console.log(`erreur lors de l'authentification`,error);
        req.session.msg = `Le mots de passe ou le nom utilisateur n'est pas correct veillez reessayer`
        res.redirect('/signin')
    }
}
