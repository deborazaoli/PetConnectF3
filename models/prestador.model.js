const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Prestador = sequelize.define("Prestador", {
    nome: { type: DataTypes.STRING, allowNull: false },
    funcao: { type: DataTypes.STRING, allowNull: false },
    telefone: { type: DataTypes.STRING }
});

module.exports = Prestador;