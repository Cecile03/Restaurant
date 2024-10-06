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

// Création table table
const tableSchema = sequelize.define('Table', {
    // définition des attributs du modèle
    idTable: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
});

  
// synchronisation du modèle avec la base de données
sequelize.sync();

tableSchema.afterSync(async () => {
    // Create tables after sync
    const lastTableId = await tableSchema.findOne({ order: [['idTable', 'DESC']] });
    
    if (lastTableId && lastTableId.dataValues.idTable > 0) {
        // If there are already records, no need to create more
        console.log('Tables already exist.');
        return;
    }

    // Create initial records
    await tableSchema.create({ capacity: 4 });
    await tableSchema.create({ capacity: 3 });
    await tableSchema.create({ capacity: 5 });
    await tableSchema.create({ capacity: 9 });
    await tableSchema.create({ capacity: 2 });
    await tableSchema.create({ capacity: 2 });
    await tableSchema.create({ capacity: 4 });

    console.log('Initial tables created.');
})


module.exports = sequelize.model('Table', tableSchema);  // Nom de la table et de la variable de création de la table
