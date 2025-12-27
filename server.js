import express from 'express';
import route from './route.js';
import path from 'node:path';
import { fileURLToPath } from "node:url";
import favicon from 'serve-favicon';
import session from 'express-session';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import logger from './config/logger.js';

const port = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Sécurité - Helmet
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
}));

// Compression
app.use(compression());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Trop de requêtes depuis cette adresse IP, veuillez réessayer plus tard.',
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);

// Rate limiting plus strict pour les routes d'authentification
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: 'Trop de tentatives de connexion, veuillez réessayer plus tard.',
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/connexion', authLimiter);
app.use('/inscription', authLimiter);

app.use(favicon(path.join(__dirname,'favicon.ico')));
app.set('view engine','ejs');
app.set('views','views');
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Configuration des sessions
app.use(session({
    secret: process.env.SESSION_SECRET || 'votre_secret_session', // Utiliser variable d'environnement
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: isProduction, // HTTPS only en production
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 heures
    }
}));

// Middleware pour passer l'utilisateur à toutes les vues
app.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
});

// Logging des requêtes
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url} - ${req.ip}`);
    next();
});

app.use(route);
app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "public/uploads")));

// Gestion des erreurs 404
app.use((req, res) => {
    logger.warn(`404 - ${req.method} ${req.url}`);
    res.status(404).render('404', { message: 'Page non trouvée' });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
    logger.error(`Erreur ${err.status || 500}: ${err.message}`, { stack: err.stack });
    res.status(err.status || 500).render('error', {
        message: isProduction ? 'Une erreur est survenue' : err.message,
        error: isProduction ? {} : err
    });
});

app.listen(port, () => {
    logger.info(`Serveur démarré sur le port ${port} en mode ${process.env.NODE_ENV || 'development'}`);
    console.log(`Le serveur tourne sur le port ${port}`);
});