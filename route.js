import express from "express";
const route = express.Router();

// Import des contrôleurs
import { createArticle, getAllArticles, getArticleById, renderArticleBlog } from "./controllers/controllerArticle.js";
import { createClient, loginClient, getProfile } from "./controllers/controllerClient.js";
import { createCommentaire } from "./controllers/controllerCommentaire.js";
import { getAdminDashboard, showCreateArticleForm, showEditArticleForm, getAdminStatistics } from "./controllers/controllerAdminView.js";

// Import des middlewares 
import { validateArticle } from "./middleware/validateArticle.js";
import { validateCommentaire } from "./middleware/validateCommentaire.js";
import { validateClient } from "./middleware/validateClient.js";
import { requireAdmin } from "./middleware/auth.js";
import upload from "./middleware/multerConfig.js";

route.get("/", renderArticleBlog);
route.get("/inscription", (req, res) => {
    res.render("inscription");
});

route.get("/connexion", (req, res) => {
    res.render("connexion");
});

// --- ROUTES COMMENTAIRES ---
route.post("/commentaire", validateCommentaire, createCommentaire);

// --- ROUTES CLIENTS ---
route.post("/client", validateClient, createClient);
route.post("/connexion", loginClient);
route.get("/profil", getProfile);
route.get("/deconnexion", (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// --- ROUTES ARTICLES ---
route.post("/article", upload.single('image'), validateArticle, createArticle);
route.get("/articles", getAllArticles);
route.get("/article/:id", getArticleById);

// --- ROUTES API ---
route.get("/api/articles", getAllArticles); // API pour chargement infini
route.get("/api/admin/stats", requireAdmin, getAdminStatistics); // API pour statistiques admin

// --- ROUTES ADMIN VIEWS ---
route.get("/admin", requireAdmin, getAdminDashboard);
route.get("/admin/article/new", requireAdmin, showCreateArticleForm);
route.get("/admin/article/edit/:id", requireAdmin, showEditArticleForm);

export default route;
