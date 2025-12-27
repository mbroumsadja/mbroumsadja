# MBROUMSADJA - Blog

Un blog moderne développé avec Node.js, Express, EJS et MySQL.

## 🚀 Fonctionnalités

- ✅ Affichage des articles avec pagination infinie
- ✅ Lecture d'articles individuels
- ✅ Système de commentaires
- ✅ Authentification et gestion des utilisateurs
- ✅ Panel d'administration avec statistiques
- ✅ Upload d'images pour les articles
- ✅ Interface responsive
- ✅ Sécurité renforcée pour la production

## 🛠️ Installation

### Prérequis

- Node.js (version 18+)
- MySQL
- npm ou yarn

### Installation des dépendances

```bash
npm install
```

### Configuration

1. Copiez le fichier `.env.example` vers `.env` :
```bash
cp .env.example .env
```

2. Modifiez les variables d'environnement dans `.env` :
```env
# Base de données
DB_HOST=localhost
DB_USER=votre_utilisateur_mysql
DB_PASSWORD=votre_mot_de_passe_mysql
DB_NAME=votre_base_de_donnees

# Application
NODE_ENV=production
PORT=3000
SESSION_SECRET=votre_cle_secrete_très_longue_et_complexe

# Logs
LOG_LEVEL=info
```

3. Créez la base de données MySQL et exécutez le script SQL :
```bash
mysql -u votre_utilisateur -p votre_base_de_donnees < data/Table.sql
```

## 🚀 Démarrage

### Développement

```bash
npm run dev
```

### Production

```bash
npm run prod
```

Ou directement :

```bash
NODE_ENV=production node server.js
```

## 🔒 Sécurité

L'application inclut plusieurs mesures de sécurité pour la production :

- **Helmet** : Protection contre les vulnérabilités XSS et autres attaques
- **Rate Limiting** : Limitation du nombre de requêtes par IP
- **Compression** : Compression des réponses HTTP
- **Sessions sécurisées** : Cookies HTTP-only et sécurisés
- **Validation des entrées** : Avec Zod
- **Logs structurés** : Avec Winston

## 📊 Monitoring

Les logs sont automatiquement générés dans le dossier `logs/` :
- `app.log` : Tous les logs de l'application
- `error.log` : Erreurs uniquement

## 🔧 Scripts disponibles

- `npm run dev` : Démarrage en mode développement avec nodemon
- `npm run prod` : Démarrage en mode production
- `npm run lint` : Vérification du code avec ESLint
- `npm run build` : Construction pour la production (lint + tests)
- `npm test` : Exécution des tests

## 📁 Structure du projet

```
mbroumsadja/
├── config/
│   └── logger.js          # Configuration des logs
├── controllers/           # Logique métier
│   ├── controllerAdminView.js
│   ├── controllerArticle.js
│   ├── controllerClient.js
│   └── controllerCommentaire.js
├── data/
│   ├── config.js          # Configuration base de données
│   └── Table.sql          # Script SQL
├── middleware/
│   ├── auth.js            # Authentification
│   ├── multerConfig.js    # Upload de fichiers
│   ├── validateArticle.js
│   ├── validateClient.js
│   └── validateCommentaire.js
├── models/                # Modèles Sequelize
│   ├── Article.js
│   ├── Client.js
│   ├── Commentaire.js
│   ├── Admin.js
│   └── init.js
├── public/                # Assets statiques
│   ├── admin.js
│   ├── index.js
│   ├── style.css
│   └── uploads/
├── views/                 # Templates EJS
│   ├── admin.ejs
│   ├── article.ejs
│   ├── articles.ejs
│   ├── connexion.ejs
│   ├── index.ejs
│   ├── inscription.ejs
│   └── profil.ejs
├── .env.example           # Variables d'environnement exemple
├── .gitignore            # Fichiers à ignorer
├── package.json
├── route.js              # Définition des routes
├── server.js             # Point d'entrée de l'application
└── README.md
```

## 🌐 Déploiement

### Avec PM2 (recommandé)

1. Installez PM2 globalement :
```bash
npm install -g pm2
```

2. Créez un fichier ecosystem.config.js :
```javascript
module.exports = {
  apps: [{
    name: 'mbroumsadja-blog',
    script: 'server.js',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G'
  }]
};
```

3. Démarrez l'application :
```bash
pm2 start ecosystem.config.js
```

### Avec Docker

1. Créez un Dockerfile :
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "run", "prod"]
```

2. Construisez et exécutez :
```bash
docker build -t mbroumsadja-blog .
docker run -p 3000:3000 --env-file .env mbroumsadja-blog
```

## 🤝 Contribution

1. Fork le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Pushez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 Licence

Ce projet est sous licence ISC.

## 📞 Support

Pour toute question ou problème, ouvrez une issue sur GitHub.

## 📁 Structure du projet

```
mbroumsadja/
├── controllers/           # Logique métier
│   ├── controllerArticle.js
│   ├── controllerCommentaire.js
│   ├── controllerClient.js
│   ├── controllerAdmin.js
│   └── controllerAdminView.js
├── middleware/            # Middlewares personnalisés
│   ├── multerConfig.js
│   ├── validateArticle.js
│   ├── validateCommentaire.js
│   ├── validateAdmin.js
│   └── validateClient.js
├── models/               # Modèles Sequelize
│   ├── Article.js
│   ├── Commentaire.js
│   ├── Client.js
│   ├── Admin.js
│   └── init.js
├── views/                # Templates EJS
│   ├── index.ejs         # Page d'accueil
│   ├── article.ejs       # Page article
│   ├── admin.ejs         # Dashboard admin
│   └── admin/
│       └── from.ejs      # Formulaire article
├── public/               # Assets statiques
│   ├── style.css
│   ├── index.js
│   ├── admin.js
│   └── uploads/          # Images uploadées
├── data/                 # Configuration BD
│   ├── config.js
│   └── Table.sql
├── route.js              # Définition des routes
├── server.js             # Point d'entrée
└── package.json
```

## 🛠 Installation

1. **Cloner le projet**
   ```bash
   git clone <repository-url>
   cd mbroumsadja
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer la base de données**
   - Créer une base de données MySQL
   - Modifier `data/config.js` avec vos credentials
   - Exécuter le script `data/Table.sql`

4. **Démarrer le serveur**
   ```bash
   npm run dev  # Mode développement avec nodemon
   # ou
   npm start    # Mode production
   ```

5. **Accéder au blog**
   - Site : http://localhost:3000
   - Admin : http://localhost:3000/admin

## 📋 Routes principales

### Public
- `GET /` - Page d'accueil avec articles
- `GET /article?id=1` - Article individuel
- `POST /commentaire` - Ajouter un commentaire

### Administration
- `GET /admin` - Dashboard admin
- `GET /admin/article/new` - Nouveau article
- `GET /admin/article/edit/:id` - Modifier article
- `POST /article` - Créer article (avec upload image)
- `PATCH /article/:id` - Modifier article
- `DELETE /article/:id` - Supprimer article

### API (JSON)
Toutes les routes supportent le format JSON en ajoutant `Accept: application/json` dans les headers.

## 🎨 Fonctionnalités techniques

### Upload d'images
- Middleware Multer configuré
- Stockage dans `public/uploads/`
- Noms de fichiers uniques
- Validation des types (images uniquement)
- Limite : 5MB par fichier

### Validation
- Middleware Zod pour la validation des données
- Vérification des champs requis
- Sanitisation des entrées

### Base de données
- MySQL avec Sequelize ORM
- Relations entre articles et commentaires
- Timestamps automatiques

## 🎯 Utilisation

### Créer un article
1. Aller sur `/admin`
2. Cliquer "Créer un nouvel article"
3. Remplir le formulaire (titre, auteur, contenu, image optionnelle)
4. L'article apparaît sur la page d'accueil

### Ajouter un commentaire
1. Ouvrir un article
2. Remplir le formulaire de commentaire en bas
3. Le commentaire s'affiche immédiatement

## 🔧 Développement

### Scripts disponibles
- `npm run dev` - Démarrage avec nodemon (rechargement auto)
- `npm start` - Démarrage en production
- `npm test` - Tests (à implémenter)

### Architecture
- **MVC** : Modèles, Vues, Contrôleurs
- **Middleware** : Validation, upload, authentification
- **Routes** : Séparation claire des endpoints
- **Views** : Templates EJS pour le rendu côté serveur

## 🚀 Déploiement

1. Build pour production
2. Configurer les variables d'environnement
3. Déployer sur un serveur (Heroku, Vercel, etc.)
4. Configurer la base de données distante

## 📝 TODO / Améliorations futures

- [ ] Système d'authentification admin
- [ ] Éditeur WYSIWYG pour les articles
- [ ] Recherche d'articles
- [ ] Catégorisation avancée
- [ ] Système de likes/commentaires
- [ ] API REST complète
- [ ] Tests unitaires et d'intégration
- [ ] Cache Redis
- [ ] CDN pour les images

---

Développé avec ❤️ par MBROUMSADJA