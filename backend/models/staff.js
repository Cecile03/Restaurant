// Model de construction de la  table pour les fiches
const dbConfig = require("../database/config.db");
const bcrypt = require(`bcrypt`);
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

// Création table staff
const staffSchema = sequelize.define('Staff', {
    // définition des attributs du modèle
    idStaff: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    staffName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            args: true,
            msg: 'Staff name allready use !'
        }
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
});

// synchronisation du modèle avec la base de données
sequelize.sync();

// Create admin account
staffSchema.afterSync(async () => {
    // Create admin account after sync
    const adminExists = await staffSchema.findOne({ where: { staffName: 'admin' } });

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync("admin", salt);

    if (!adminExists) {
        await staffSchema.create({
            staffName: 'admin',
            role: 'Admin',
            password: hash,
        });

        console.log('Admin account created successfully.');
    } else {
        console.log('Admin account already exists.');
    }
})

module.exports = sequelize.model('Staff', staffSchema);  // Nom de la table et de la variable de création de la table