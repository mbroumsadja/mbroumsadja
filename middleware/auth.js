// Middleware pour vérifier si l'utilisateur est connecté
export const requireAuth = (req, res, next) => {
    if (req.session.user) {
        return next();
    } else {
        res.redirect('/connexion');
    }
};

// Middleware pour vérifier si c'est un admin (si on ajoute un champ role)
export const requireAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'admin') {
        return next();
    } else {
        res.redirect('/connexion');
    }
};