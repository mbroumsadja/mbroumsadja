import Client from "./Client.js";
import Commentaire from "./Commentaire.js";
import Article from "./Article.js";
import sequelize from "../data/config.js";

Client.hasMany(Commentaire, { foreignKey: 'id_client' });
Commentaire.belongsTo(Client, { foreignKey: 'id_client' });

Article.hasMany(Commentaire, { foreignKey: 'id_article' });
Commentaire.belongsTo(Article, { foreignKey: 'id_article' });

async function init() {
  await sequelize.sync({force : true});
  console.log("Base de données synchronisée");

  // Ajouter des données de test
  await Article.bulkCreate([
    { titre: 'Premier article', auteur: 'Admin', categorie: 'Tech', corps: 'Contenu du premier article', createdAt: new Date('2024-01-01') },
    { titre: 'Deuxième article', auteur: 'Admin', categorie: 'News', corps: 'Contenu du deuxième article', createdAt: new Date('2024-02-01') },
    { titre: 'Troisième article', auteur: 'Admin', categorie: 'Tech', corps: 'Contenu du troisième article', createdAt: new Date('2024-02-15') },
    { titre: 'Quatrième article', auteur: 'Admin', categorie: 'Sport', corps: 'Contenu du quatrième article', createdAt: new Date('2024-03-01') },
  ]);

  await Client.bulkCreate([
    { nom: 'Dupont', prenom: 'Jean', email: 'jean@example.com', mot_de_passe: 'password' },
    { nom: 'Admin', prenom: 'Super', email: 'admin@example.com', mot_de_passe: 'admin', role: 'admin' },
    { nom: 'Admin2', prenom: 'Test', email: 'testadmin@example.com', mot_de_passe: 'test123', role: 'admin' },
  ]);

  await Commentaire.bulkCreate([
    { auteur: 'Jean Dupont', commentaire: 'Super article !', id_article: 1 },
    { auteur: 'Marie Martin', commentaire: 'Très intéressant.', id_article: 1 },
    { auteur: 'Jean Dupont', commentaire: 'Merci pour l\'info.', id_article: 2 },
  ]);

  console.log("Données de test ajoutées");
};

await init()

export default init