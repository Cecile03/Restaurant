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

// Création table user
const userSchema = sequelize.define('User', {
    // définition des attributs du modèle
    idUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            args: true,
            msg: 'Email allready use !'
        }
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
});

  
// synchronisation du modèle avec la base de données
sequelize.sync();

module.exports = sequelize.model('User', userSchema);  // Nom de la table et de la variable de création de la table
