import { z } from 'zod';

const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        return res.status(400).json({ errors: error.errors });
    }
};

export const commentaireSchema = z.object({
    auteur: z.string().nonempty("L'auteur est requis"),
    commentaire: z.string()
                  .min(1, "Le commentaire ne peut pas être vide")
                  .max(1000, "Le commentaire est limité à 1000 caractères")
});

export const validateCommentaire = validate(commentaireSchema);