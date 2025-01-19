import express from "express";
const Droute = express.Router();
import feetchArticles from '../controller/Dcontroller.js';
import { AllUser } from "../controller/Acontroller.js";

Droute.get('/',async(req, res) =>{

    const session = req.cookies.username;
    const refuse = req.cookies.message;
    const Articles = await feetchArticles();

    res.render('index',{
        session:session,
        Articles:Articles,
        refuse:refuse,
    })
});

Droute.get('/admin',(req, res) =>{
    res.render('newArticle');
});

Droute.get('/user',AllUser,(req, res) =>{
    const users = req.cookies.user;
    res.render('utilisateur',{users:users});
});


export default Droute;
