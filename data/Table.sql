CREATE TABLE client (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255)
);

CREATE TABLE admin (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255),
    mots_passe VARCHAR(255)
);

CREATE TABLE article (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titre VARCHAR(255),
    corps TEXT,
    auteur VARCHAR(255),
    reference TEXT,
    categorie VARCHAR(255),
    lien_image VARCHAR(255),
);

CREATE TABLE commentaire (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_client INT,
    id_article INT,
    commentaire TEXT,
    FOREIGN KEY (id_client) REFERENCES client(id_client),
    FOREIGN KEY (id_article) REFERENCES article(id_article)
)