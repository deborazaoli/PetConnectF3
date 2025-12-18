
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Agendamento = sequelize.define("Agendamento", {
    data: { type: DataTypes.DATE, allowNull: false },
    observacoes: { type: DataTypes.TEXT }
});

module.exports = Agendamento;