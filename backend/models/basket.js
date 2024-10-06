// Model de construction de la  basket pour les fiches
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

// Création basket basket
const basketSchema = sequelize.define('Basket', {
    // définition des attributs du modèle
    idBasket: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    idOrder: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idStock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});


const orderSchema = require('./order')
const stockSchema = require('./stock')

// 1:1
basketSchema.belongsTo(orderSchema, { foreignKey: 'idOrder', onDelete: 'CASCADE' });    // Delete order => delete baskets
basketSchema.belongsTo(stockSchema, { foreignKey: 'idStock', onDelete: 'SET DEFAULT' });   // Delete stock => don't delete baskets

// synchronisation du modèle avec la base de données
sequelize.sync();

module.exports = sequelize.model('Basket', basketSchema);  // Nom de la basket et de la variable de création de la basket
