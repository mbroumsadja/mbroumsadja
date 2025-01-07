import express from "express";
import { saveUser, verifierUser } from "../controller/Acontroller.js";

const Aroute = express.Router();

Aroute.get('/signin',(req, res) =>{
    const message = req.body.msg;
    res.render('signin',{message:message});
});

Aroute.get('/signup',(req, res) =>{
    res.render('signup');
});

Aroute.get('/logout',(req, res) =>{
    req.session.destroy();
    res.redirect('/signin')
});

Aroute.post('/signin',verifierUser,(req, res) =>{});
Aroute.post('/signup',saveUser,(req, res) =>{});


export default Aroute;