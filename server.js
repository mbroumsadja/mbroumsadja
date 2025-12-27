import express from 'express';
import route from './route.js';
import path from 'node:path';
import { fileURLToPath } from "node:url";
import favicon from 'serve-favicon';
import session from 'express-session';

const port = 3000

const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(favicon(path.join(__dirname,'favicon.ico')));
app.set('view engine','ejs')
app.set('views','views')
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// Configuration des sessions
app.use(session({
    secret: 'votre_secret_session', // Changez cela en production
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Mettez true en HTTPS
}))

// Middleware pour passer l'utilisateur à toutes les vues
app.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
});

app.use(route)
app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "public/uploads")));

app.listen(port , ()=>{
    console.log('le server tourne sur le port ' + port)
});