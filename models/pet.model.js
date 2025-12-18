const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");


const Pet = sequelize.define("Pet", {
    nome: { type: DataTypes.STRING, allowNull: false },
    especie: { type: DataTypes.STRING, allowNull: false },
    raca: { type: DataTypes.STRING }, 
    idade: { type: DataTypes.INTEGER } 
});

module.exports = Pet;