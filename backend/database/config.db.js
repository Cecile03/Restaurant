require('dotenv').config();

// Logs de connexion à la db. Récupérer dans le .env, en local, ou depuis le docker compose, sur serveur
module.exports = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: 'root',
    DB: 'restaurant_db',
    dialect: "mysql" || "mariadb",
};