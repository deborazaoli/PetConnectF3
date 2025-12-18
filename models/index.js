const sequelize = require('../config/database');

// Importar os modelos
const Tutor = require('./tutor.model');
const Pet = require('./pet.model');
const Prestador = require('./prestador.model');
const Veterinario = require('./veterinario.model');
const Servico = require('./servico.model');
const Agendamento = require('./agendamento.model');
const Prontuario = require('./prontuario.model');

// --- ASSOCIAÇÕES BIDIRECIONAIS ---

// 1. Tutor <-> Pet
Tutor.hasMany(Pet, { foreignKey: 'tutorId', onDelete: 'CASCADE' });
Pet.belongsTo(Tutor, { foreignKey: 'tutorId' });

// 2. Pet <-> Prontuario
Pet.hasMany(Prontuario, { foreignKey: 'petId', onDelete: 'CASCADE' });
Prontuario.belongsTo(Pet, { foreignKey: 'petId' });

// --- OUTRAS ASSOCIAÇÕES ---

// Veterinário assina o prontuário
Veterinario.hasMany(Prontuario, { foreignKey: 'veterinarioId' });
Prontuario.belongsTo(Veterinario, { foreignKey: 'veterinarioId' });

// Agendamento relações
Pet.hasMany(Agendamento, { foreignKey: 'petId' });
Agendamento.belongsTo(Pet, { foreignKey: 'petId' });

Veterinario.hasMany(Agendamento, { foreignKey: 'veterinarioId' });
Agendamento.belongsTo(Veterinario, { foreignKey: 'veterinarioId' });

Servico.hasMany(Agendamento, { foreignKey: 'servicoId' });
Agendamento.belongsTo(Servico, { foreignKey: 'servicoId' });

module.exports = {
    sequelize,
    Tutor,
    Pet,
    Prestador,
    Veterinario,
    Servico,
    Agendamento,
    Prontuario
};