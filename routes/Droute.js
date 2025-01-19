import express from "express";
const Droute = express.Router();
import feetchArticles from '../controller/Dcontroller.js';

Droute.get('/',async(req, res) =>{

    const session = req.cookies.username;

      const Articles = await feetchArticles();

    res.render('index',{
        session:session,
        Articles:Articles,
    })
});

Droute.get('/admin',(req, res) =>{
    res.render('newArticle');
});

export default Droute;
