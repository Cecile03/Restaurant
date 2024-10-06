// Model de construction de la  table pour les fiches
const dbConfig = require("../database/config.db");
const path = require('path');
const fs = require('fs');

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    dialect: dbConfig.dialect,
    host: dbConfig.HOST,
    define: {
        timestamps: true,
        createdAt: false,   // Don't add createdAt attribute
        updatedAt: false,   // Don't add updatedAt attribute
        }
});

// Création table stock
const stockSchema = sequelize.define('Stock', {
    // définition des attributs du modèle
    idStock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    available: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: 'Pas de descrption'
    },
    picture: {
        type: DataTypes.STRING,
    }
});

  
// synchronisation du modèle avec la base de données
sequelize.sync();

module.exports = sequelize.model('Stock', stockSchema);  // Nom de la table et de la variable de création de la table



// INSERT INTO stocks (name, quantity, type, price, available, description)
// VALUES
// ('Steak frites', 23, 'Plat', 2.0, true, 'Description ici'),
// ('Frites', 23, 'Plat', 2.0, false, 'Ici'),
// ('Steak', 23, 'Plat', 2.0, true, 'Description ici'),
// ('Salade César', 20, 'Entrée', 8.0, true, 'Salade fraîche avec du poulet grillé, du parmesan et une vinaigrette César.'),
// ('Pâtes Carbonara', 18, 'Plat', 10.0, true, 'Pâtes avec une sauce carbonara crémeuse, du bacon et du parmesan.'),
// ('Tiramisu', 15, 'Dessert', 5.0, true, 'Dessert italien classique avec du mascarpone, des biscuits à la cuillère et du café.'),
// ('Coca-Cola', 30, 'Boisson', 2.5, true, 'Boisson gazeuse rafraîchissante.'),
// ('Pizza Margherita', 25, 'Plat', 12.0, true, 'Pizza classique avec de la sauce tomate, de la mozzarella et du basilic.'),
// ('Salade de fruits', 22, 'Dessert', 6.0, true, 'Mélange rafraîchissant de fruits de saison.'),
// ('Eau minérale', 40, 'Boisson', 1.5, true, 'Eau minérale plate.'),
// ('Burger Bacon', 25, 'Plat', 9.0, true, 'Burger savoureux avec du bacon croustillant et du fromage fondant.'),
// ('Mousse au chocolat', 18, 'Dessert', 4.5, true, 'Dessert chocolaté et onctueux.'),
// ('Salade niçoise', 20, 'Entrée', 7.0, true, 'Salade composée avec du thon, des haricots verts, des tomates et des œufs.'),
// ('Poulet rôti', 22, 'Plat', 11.0, true, 'Poulet tendre rôti au four avec des herbes et des épices.'),
// ('Tarte aux pommes', 16, 'Dessert', 5.0, true, 'Tarte sucrée aux pommes avec une délicieuse croûte dorée.'),
// ('Soupe à l\'oignon', 20, 'Entrée', 6.0, true, 'Soupe chaude à l\'oignon gratinée au fromage.'),
// ('Sushi assorti', 24, 'Plat', 13.0, true, 'Assortiment de sushis frais et savoureux.'),
// ('Crème brûlée', 18, 'Dessert', 7.5, true, 'Dessert français classique avec une croûte caramélisée.'),
// ('Calamars frits', 20, 'Entrée', 8.0, true, 'Calamars tendres et croustillants accompagnés de sauce tartare.'),
// ('Risotto aux champignons', 22, 'Plat', 10.0, true, 'Risotto crémeux aux champignons sautés.'),
// ('Tarte au citron', 16, 'Dessert', 6.5, true, 'Tarte acidulée au citron avec une croûte fondante.'),
// ('Caprese', 20, 'Entrée', 8.0, true, 'Salade italienne avec des tomates, de la mozzarella et du basilic.'),
// ('Filet mignon', 18, 'Plat', 15.0, true, 'Filet mignon de bœuf grillé à la perfection.'),
// ('Gâteau au fromage', 16, 'Dessert', 7.0, true, 'Gâteau au fromage crémeux avec un coulis de fruits rouges.'),
// ('Houmous', 20, 'Entrée', 5.0, true, 'Purée de pois chiches servie avec du pain pita.');

