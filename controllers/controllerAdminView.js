import Article from "../models/Article.js";
import Commentaire from "../models/Commentaire.js";
import Client from "../models/Client.js";

export const getAdminDashboard = async (req, res) => {
    try {
   const [totalArticles, totalCommentaires, totalClients] = await Promise.all([
            Article.count(),
            Commentaire.count(),
            Client.count()
        ]);

        console.log(totalArticles,totalClients,totalCommentaires)
        // Articles récents
        const recentArticles = await Article.findAll({
            limit: 5,
            order: [['createdAt', 'DESC']]
        });

        res.render('admin', {
            totalArticles,
            totalCommentaires,
            totalClients,
            recentArticles
        });
    } catch (error) {
        res.status(500).render('admin', {
            error: error.message,
            totalArticles: 0,
            totalCommentaires: 0,
            totalClients: 0,
            recentArticles: []
        });
    }
};

export const showCreateArticleForm = async (req, res) => {
    const article = null;
    res.render('admin/from',{article}); // Ne pas passer article pour la création
};

export const showEditArticleForm = async (req, res) => {
    try {
        const article = await Article.findByPk(req.params.id);
        if (!article) {
            return res.status(404).render('admin/from', {
                article: null,
                error: 'Article non trouvé'
            });
        }
        res.render('admin/from', { article });
    } catch (error) {
        res.status(500).render('admin/from', {
            article: null,
            error: error.message
        });
    }
};

export const getAdminStatistics = async (req, res) => {
    try {
        const [totalArticles, totalCommentaires, totalClients] = await Promise.all([
            Article.count(),
            Commentaire.count(),
            Client.count()
        ]);

        console.log('Totaux:', { totalArticles, totalCommentaires, totalClients });

        res.json({
            totalArticles,
            totalCommentaires,
            totalClients
        });
    } catch (error) {
        console.error('Erreur dans getAdminStatistics:', error);
        res.status(500).json({ error: error.message });
    }
};