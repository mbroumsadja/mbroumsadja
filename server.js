import express from "express";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import Droute from "./routes/Droute.js";
import Aroute from "./routes/Aroute.js";
import { fileURLToPath } from 'url';
import { dirname } from 'node:path';
import path from 'path';
import cookieparser from 'cookie-parser';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set("view engine", "ejs");
app.set('views',path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieparser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(Droute);
app.use(Aroute);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.listen(port, (req, res) =>{ 
    console.log(`le serveur tourne sur le http://localhost:${port}`);
});