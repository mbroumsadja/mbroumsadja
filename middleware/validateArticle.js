import z from 'zod';

const articleSchema = z.object({
  titre: z.string().min(3, "Le titre est trop court"),
  corps: z.string().min(10, "Le contenu doit être plus long"),
  auteur: z.string().nonempty("L'auteur est requis"),
  reference: z.string().optional(),
  categorie: z.string().nonempty(),
  lien_image: z.url("Format d'URL invalide").optional()
});

export const validateArticle = (req, res, next) => {
    const result = articleSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: "Validation échouée",
            errors: result.error.errors
        });
    }

    next(); 
};
