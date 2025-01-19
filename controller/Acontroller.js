import User from "../models/user.js";

export const saveUser = async (req, res , next) =>{
    try {
        const user =  await User.create(req.body);

        res.cookie("username", user.username ,{maxAge:10000000});
        res.cookie("role", user.role,{maxAge:10000000});
        res.redirect('/');
        return
    
    } catch (error) {
        res.redirect('/signup')
        res.cookie("msg", `Le nom d'utilisateur ou l'email est deja pris`,{maxAge:10000000}); 
        console.log(`erreur lors de l'enregistrement`,error)
    }
}

export const verifierUser = async (req, res , next) =>{
    try {
        const password = req.body.password
        const users =  await User.findOne({
            where:{password}
        });
        res.cookie("username", users.username,{maxAge:10000000});
        res.redirect('/');
        return
    
    } catch (error) {
        console.log(`erreur lors de l'authentification`,error);
        res.cookie("msg", `Le nom d'utilisateur ou l'email est deja pris`,{maxAge:10000000}); 
        res.redirect('/signin')
    }

};

export const AllUser = async (req, res , next) =>{
    try {
        const users =  await User.findAll({attributes: ['username','email']});
        res.cookie('user',users,{maxAge:10000000});
        next()
        return  users;
    
    } catch (error) {
        console.log(`erreur lors de la recuperation des utilisateurs`,error);
        res.redirect('/')
    }

}
