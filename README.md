# MBROUMSADJA - Blog

Un blog moderne développé avec Node.js, Express, EJS et MySQL.

## 🚀 Fonctionnalités

- ✅ Affichage des articles avec pagination
- ✅ Lecture d'articles individuels
- ✅ Système de commentaires
- ✅ Panel d'administration
- ✅ Upload d'images pour les articles
- ✅ Interface responsive

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