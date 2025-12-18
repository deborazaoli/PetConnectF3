const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Prontuario = sequelize.define('Prontuario', {
    descricao: { 
        type: DataTypes.TEXT, 
        allowNull: false 
    },
    dataAtendimento: { 
        type: DataTypes.DATE, 
        defaultValue: DataTypes.NOW 
    }
});

module.exports = Prontuario;