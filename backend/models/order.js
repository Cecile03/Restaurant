// Model de construction de la  order pour les fiches
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

// Création order order
const orderSchema = sequelize.define('Order', {
    // définition des attributs du modèle
    idOrder: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'En attente'
    },
    idUser: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idStaff: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
});


const staffSchema = require('./staff')
const userSchema = require('./user')

// 1:1
orderSchema.belongsTo(staffSchema, { foreignKey: 'idStaff', onDelete: 'SET DEFAULT' });    // Delete staff => don't delete orders
orderSchema.belongsTo(userSchema, { foreignKey: 'idUser', onDelete: 'CASCADE' });       // Delete user => delete all orders

// synchronisation du modèle avec la base de données
sequelize.sync();

module.exports = sequelize.model('Order', orderSchema);  // Nom de la order et de la variable de création de la order
