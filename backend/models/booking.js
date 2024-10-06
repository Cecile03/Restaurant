// Model de construction de la  booking pour les fiches
const dbConfig = require("../database/config.db");


const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    dialect: dbConfig.dialect,
    host: dbConfig.HOST,
    define: {
        timestamps: true,
        createdAt: true,   // Don't add createdAt attribute
        updatedAt: false,   // Don't add updatedAt attribute
    },
    dialectOptions: {
        dateStrings: true,
    }
});

// Création booking booking
const bookingSchema = sequelize.define('Booking', {
    // définition des attributs du modèle
    idBooking: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },

    idUser: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    idTable: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },

    service :{
        type: DataTypes.STRING,
        enum: ['midi','soir'],
        allowNull: false
    },

    stateBooking :{
        type: DataTypes.STRING,
        enum: ['A confirmer','Confirmée','Annulée'],
        allowNull: false
    },

    nbPeople :{
        type: DataTypes.INTEGER,
        allowNull:false

    },
    nameUser :{
        type: DataTypes.STRING,
        allowNull : false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), // Set the default value to the current timestamp
    },
});

const userSchema = require('./user')
const tableSchema = require('./table')

// 1:1
bookingSchema.belongsTo(userSchema, { foreignKey: 'idUser', onDelete: 'CASCADE' });       // Delete user => delete all bookings
bookingSchema.belongsTo(tableSchema, { foreignKey: 'idTable', onDelete: 'SET DEFAULT' });    // Delete table => don't delete bookings

// synchronisation du modèle avec la base de données
sequelize.sync();

module.exports = sequelize.model('Booking', bookingSchema);  // Nom de la booking et de la variable de création de la booking

