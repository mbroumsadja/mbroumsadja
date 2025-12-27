import  Client  from '../models/Client.js';

export const createClient = async (req, res) => {
    try {
        console.log('Création client:', req.body);
        // Vérifier si l'email existe déjà
        const existingClient = await Client.findOne({ where: { email: req.body.email } });
        if (existingClient) {
            return res.status(400).send('Cet email est déjà utilisé');
        }
        const client = await Client.create(req.body);
        console.log('Client créé:', client.id);
        // Rediriger vers la page de connexion après inscription
        res.redirect('/connexion');
    } catch (error) {
        console.error('Erreur création client:', error);
        res.status(500).send('Erreur lors de l\'inscription');
    }
};

export const loginClient = async (req, res) => {
    try {
        const { email, mot_de_passe } = req.body;
        console.log('Tentative connexion:', email);
        const client = await Client.findOne({ where: { email } });
        if (!client || client.mot_de_passe !== mot_de_passe) {
            console.log('Connexion échouée pour:', email);
            return res.status(401).send('Email ou mot de passe incorrect');
        }
        // Stocker l'utilisateur en session
        req.session.user = {
            id: client.id,
            nom: client.nom,
            prenom: client.prenom,
            email: client.email,
            role: client.role
        };
        console.log('Connexion réussie pour:', email);
        res.redirect('/');
    } catch (error) {
        console.error('Erreur connexion:', error);
        res.status(500).send('Erreur lors de la connexion');
    }
};

export const getProfile = async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/connexion');
    }
    res.render('profil', { user: req.session.user });
};
