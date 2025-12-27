import Commentaire from '../models/Commentaire.js';

export const createCommentaire = async (req, res) => {
    try {
        const nouveauCom = await Commentaire.create(req.body);

        // Si c'est une requête AJAX, retourner JSON
        if (req.headers.accept && req.headers.accept.includes('application/json')) {
            res.status(201).json({
                message: "Commentaire ajouté avec succès",
                data: nouveauCom
            });
        } else {
            // Rediriger vers la page de l'article
            res.redirect(`/article/${nouveauCom.id}`);
        }
    } catch (error) {
        if (req.headers.accept && req.headers.accept.includes('application/json')) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).send('Erreur lors de l\'ajout du commentaire');
        }
    }
};
