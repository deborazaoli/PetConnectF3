const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Servico = sequelize.define("Servico", {
    nome: { type: DataTypes.STRING, allowNull: false },
    preco: { type: DataTypes.FLOAT, allowNull: false },
    descricao: { type: DataTypes.TEXT }
});

module.exports = Servico;