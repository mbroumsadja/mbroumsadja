import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import dotenv from 'dotenv';
import Droute from "./routes/Droute.js";
import Aroute from "./routes/Aroute.js";
import isadmin from "./middleware/isAdmin.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.set("view engine", "ejs");
app.set("views","views");
app.use(express.static("public"));
app.use(session({
    secret: 'love',
    resave:false,
    saveUninitialized:true,
    cookie:{
        secure: process.env.NODE_ENV,
        maxAge: 86000000,
        httpOnly: true,    
}}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(Droute);
app.use(Aroute);
app.use('/admin',isadmin);

app.listen(port, (req, res) =>{ 
    console.log(`le serveur tourne sur le http://localhost:${port}`);
});