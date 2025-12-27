import { z } from 'zod';

const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        return res.status(400).json({ errors: error.errors });
    }
};

export const clientSchema = z.object({
    nom: z.string()
         .min(2, "Le nom doit contenir au moins 2 caractères")
         .max(100, "Le nom est trop long"),
    prenom: z.string()
         .min(2, "Le prénom doit contenir au moins 2 caractères")
         .max(100, "Le prénom est trop long"),
    email: z.string()
         .email("Email invalide"),
    mot_de_passe: z.string()
         .min(6, "Le mot de passe doit contenir au moins 6 caractères")
});

export const validateClient = validate(clientSchema);