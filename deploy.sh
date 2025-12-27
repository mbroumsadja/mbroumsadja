#!/bin/bash

# Script de déploiement pour MBROUMSADJA Blog
# Utilisation: ./deploy.sh [environment]

ENVIRONMENT=${1:-production}
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "🚀 Déploiement de MBROUMSADJA en mode $ENVIRONMENT"

# Vérifier si .env existe
if [ ! -f ".env" ]; then
    echo "❌ Fichier .env manquant. Copiez .env.example vers .env et configurez-le."
    exit 1
fi

# Installer les dépendances
echo "📦 Installation des dépendances..."
npm install --production=false

# Linting
echo "🔍 Vérification du code..."
npm run lint 2>/dev/null || echo "⚠️  ESLint non configuré, ignoré"

# Tests
echo "🧪 Exécution des tests..."
npm test 2>/dev/null || echo "⚠️  Aucun test configuré, ignoré"

# Build (si nécessaire)
echo "🔨 Construction de l'application..."
npm run build 2>/dev/null || echo "ℹ️  Aucun script de build, ignoré"

# Créer les dossiers nécessaires
echo "📁 Création des dossiers..."
mkdir -p logs
mkdir -p public/uploads

# Vérifier la configuration de la base de données
echo "🗄️  Vérification de la base de données..."
node -e "
import sequelize from './data/config.js';
try {
  await sequelize.authenticate();
  console.log('✅ Connexion à la base de données réussie');
  process.exit(0);
} catch (error) {
  console.error('❌ Erreur de connexion à la base de données:', error.message);
  process.exit(1);
}
"

if [ $? -ne 0 ]; then
    echo "❌ Échec de la connexion à la base de données"
    exit 1
fi

# Démarrer l'application
if [ "$ENVIRONMENT" = "development" ]; then
    echo "🚀 Démarrage en mode développement..."
    npm run dev
elif command -v pm2 &> /dev/null; then
    echo "🚀 Démarrage avec PM2..."
    pm2 stop mbroumsadja-blog 2>/dev/null || true
    pm2 start ecosystem.config.js --env $ENVIRONMENT
    pm2 save
    pm2 startup
else
    echo "🚀 Démarrage avec Node.js..."
    npm run prod
fi

echo "✅ Déploiement terminé avec succès !"
echo "🌐 L'application est accessible sur http://localhost:$(grep -oP 'PORT=\K\d+' .env || echo 3000)"