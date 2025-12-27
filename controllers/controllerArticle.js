import Article from "../models/Article.js";
import Commentaire from "../models/Commentaire.js";

export const createArticle = async (req, res) => {
    try {
        console.log(req.body);
        const dataFormate = Object.fromEntries(
            Object.entries(req.body).map(([key, value]) => [
                key, 
                typeof value === 'string' ? value.toLowerCase() : value
            ])
        );

        if (req.file) {
            dataFormate.lien_image = `/images/${req.file.filename}`;
        }else{
            dataFormate.lien_image = null;
        }

        const article = await Article.create(dataFormate);

        // Si c'est une requête AJAX ou API, retourner JSON
        if (req.headers.accept && req.headers.accept.includes('application/json')) {
            res.status(201).json({ message: `Article ${article.titre} créé`, data: article });
        } else {
            // Rediriger vers le panel admin
            res.redirect('/admin');
        }
    } catch (error) {
        if (req.headers.accept && req.headers.accept.includes('application/json')) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).send('Erreur lors de la création de l\'article');
        }
    }
};

export const getAllArticles = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 20;
        const offset = (page - 1) * limit;

        const { count, rows } = await Article.findAndCountAll({
            limit: limit,
            offset: offset,
            order: [['createdAt', 'DESC']]
        });

        // Si c'est une requête AJAX ou API, retourner JSON
        if (req.headers.accept && req.headers.accept.includes('application/json')) {
            res.status(200).json({
                totalArticles: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                articlesPerPage: rows.length,
                data: rows
            });
        } else {
            // Rendre la vue pour le navigateur
            res.render('articles', {
                articles: rows
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const renderArticleBlog = async (req, res) => {
    try {
        // Récupérer le paramètre offset (par défaut 0)
        const offset = parseInt(req.query.offset) || 0;
        const limit = 20;

        const { count, rows } = await Article.findAndCountAll({
            limit: limit,
            offset: offset,
            order: [['createdAt', 'DESC']]
        });

        const hasMore = (offset + limit) < count;

        if (req.headers.accept && req.headers.accept.includes('application/json')) {
            // Retourner JSON pour AJAX
            res.json({
                articles: rows,
                hasMore: hasMore
            });
        } else {
            // Rendre la vue complète
            res.render('index', { articles: rows, user: req.session.user });
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

export const getArticleById = async (req, res) => {
    try {
        const article = await Article.findByPk(req.params.id);
        if (!article) {
            if (req.headers.accept && req.headers.accept.includes('application/json')) {
                return res.status(404).json({ message: "Article non trouvé" });
            } else {
                return res.render('article', { article: null });
            }
        }

        // Récupérer les commentaires associés
        const commentaires = await Commentaire.findAll({
            where: { id: article.id },
            order: [['createdAt', 'DESC']]
        });

        if (req.headers.accept && req.headers.accept.includes('application/json')) {
            res.status(200).json(article);
        } else {
            res.render('article', { article, commentaires });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
