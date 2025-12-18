const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { engine } = require('express-handlebars');

const { 
    Tutor, Pet, Prestador, Veterinario, Servico, Agendamento, Prontuario, sequelize 
} = require('./models/index');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.engine('handlebars', engine({
    defaultLayout: 'main',
    allowProtoPropertiesByDefault: true, 
    helpers: {
        ifEquals(a, b, opts) {
            return a == b ? opts.fn(this) : opts.inverse(this);
        }
    }
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => res.render('home'));

//Tutores
app.get('/tutores', async (req, res) => {
    const tutores = await Tutor.findAll({ raw: true }); 
    res.render('tutores/list', { tutores });
});
app.get('/tutores/cadastrar', (req, res) => res.render('tutores/form'));
app.post('/tutores/cadastrar', async (req, res) => {
    await Tutor.create(req.body); 
    res.redirect('/tutores');
});
app.get('/tutores/editar/:id', async (req, res) => {
    const tutor = await Tutor.findByPk(req.params.id, { raw: true }); 
    res.render('tutores/edit', { tutor });
});
app.post('/tutores/editar/:id', async (req, res) => {
    await Tutor.update(req.body, { where: { id: req.params.id } }); res.redirect('/tutores');
});
app.get('/tutores/excluir/:id', async (req, res) => {
    await Tutor.destroy({ where: { id: req.params.id } }); res.redirect('/tutores');
});

//animais
app.get('/animais', async (req, res) => {
    const pets = await Pet.findAll({ 
        include: [Tutor],
        raw: true,
        nest: true 
    });
    res.render('animais/list', { pets });
});

app.get('/animais/cadastrar', async (req, res) => {
    const tutores = await Tutor.findAll({ raw: true }); 
    res.render('animais/form', { tutores });
});
app.post('/animais/cadastrar', async (req, res) => {
    await Pet.create(req.body); res.redirect('/animais');
});
app.get('/animais/editar/:id', async (req, res) => {
    const pet = await Pet.findByPk(req.params.id, { raw: true });
    const tutores = await Tutor.findAll({ raw: true });
    res.render('animais/edit', { pet, tutores });
});
app.post('/animais/editar/:id', async (req, res) => {
    await Pet.update(req.body, { where: { id: req.params.id } }); res.redirect('/animais');
});
app.get('/animais/excluir/:id', async (req, res) => {
    await Pet.destroy({ where: { id: req.params.id } }); res.redirect('/animais');
});

//prestadores
app.get('/prestadores', async (req, res) => {
    const prestadores = await Prestador.findAll({ raw: true }); 
    res.render('prestadores/list', { prestadores });
});

app.get('/prestadores/cadastrar', (req, res) => res.render('prestadores/form'));
app.post('/prestadores/cadastrar', async (req, res) => {
    await Prestador.create(req.body); res.redirect('/prestadores');
});
app.get('/prestadores/editar/:id', async (req, res) => {
    const prestador = await Prestador.findByPk(req.params.id, { raw: true });
    res.render('prestadores/edit', { prestador });
});
app.post('/prestadores/editar/:id', async (req, res) => {
    await Prestador.update(req.body, { where: { id: req.params.id } }); res.redirect('/prestadores');
});
app.get('/prestadores/excluir/:id', async (req, res) => {
    await Prestador.destroy({ where: { id: req.params.id } }); res.redirect('/prestadores');
});

//veterinarios
app.get('/veterinarios', async (req, res) => {
    const veterinarios = await Veterinario.findAll({ raw: true }); 
    res.render('veterinarios/list', { veterinarios });
});

app.get('/veterinarios/cadastrar', (req, res) => res.render('veterinarios/form'));
app.post('/veterinarios/cadastrar', async (req, res) => {
    await Veterinario.create(req.body); res.redirect('/veterinarios');
});
app.get('/veterinarios/editar/:id', async (req, res) => {
    const veterinario = await Veterinario.findByPk(req.params.id, { raw: true });
    res.render('veterinarios/edit', { veterinario });
});
app.post('/veterinarios/editar/:id', async (req, res) => {
    await Veterinario.update(req.body, { where: { id: req.params.id } }); res.redirect('/veterinarios');
});
app.get('/veterinarios/excluir/:id', async (req, res) => {
    await Veterinario.destroy({ where: { id: req.params.id } }); res.redirect('/veterinarios');
});

//servicos
app.get('/servicos', async (req, res) => {
    const servicos = await Servico.findAll({ raw: true }); 
    res.render('servicos/list', { servicos });
});

app.get('/servicos/cadastrar', (req, res) => res.render('servicos/form'));
app.post('/servicos/cadastrar', async (req, res) => {
    await Servico.create(req.body); res.redirect('/servicos');
});
app.get('/servicos/editar/:id', async (req, res) => {
    const servico = await Servico.findByPk(req.params.id, { raw: true });
    res.render('servicos/edit', { servico });
});
app.post('/servicos/editar/:id', async (req, res) => {
    await Servico.update(req.body, { where: { id: req.params.id } }); res.redirect('/servicos');
});
app.get('/servicos/excluir/:id', async (req, res) => {
    await Servico.destroy({ where: { id: req.params.id } }); res.redirect('/servicos');
});

//agendamentos
app.get('/agendamentos', async (req, res) => {
    const agendamentos = await Agendamento.findAll({ 
        include: [Pet, Veterinario, Servico],
        raw: true, 
        nest: true 
    });
    res.render('agendamentos/list', { agendamentos });
});

app.get('/agendamentos/cadastrar', async (req, res) => {
    const pets = await Pet.findAll({ 
        raw: true, 
        nest: true,
        include: Tutor 
    }); 
    const veterinarios = await Veterinario.findAll({ raw: true }); 
    const servicos = await Servico.findAll({ raw: true });
    
    res.render('agendamentos/form', { pets, veterinarios, servicos });
});

app.post('/agendamentos/cadastrar', async (req, res) => {
    await Agendamento.create(req.body); res.redirect('/agendamentos');
});
app.get('/agendamentos/editar/:id', async (req, res) => {
    const agendamento = await Agendamento.findByPk(req.params.id, { raw: true });
    const pets = await Pet.findAll(); 
    const veterinarios = await Veterinario.findAll(); 
    const servicos = await Servico.findAll();
    res.render('agendamentos/edit', { agendamento, pets, veterinarios, servicos });
});
app.get('/agendamentos/editar/:id', async (req, res) => {
    const agendamento = await Agendamento.findByPk(req.params.id, { raw: true });
    const pets = await Pet.findAll({ raw: true }); 
    const veterinarios = await Veterinario.findAll({ raw: true }); 
    const servicos = await Servico.findAll({ raw: true });
    res.render('agendamentos/edit', { agendamento, pets, veterinarios, servicos });
});

app.get('/agendamentos/excluir/:id', async (req, res) => {
    await Agendamento.destroy({ where: { id: req.params.id } }); res.redirect('/agendamentos');
});

//prontuarios
app.get('/prontuarios', async (req, res) => {
    const prontuarios = await Prontuario.findAll({ 
        include: [Pet, Veterinario],
        raw: true,
        nest: true 
    });
    res.render('prontuarios/list', { prontuarios });
});

app.get('/prontuarios/cadastrar', async (req, res) => {
    const pets = await Pet.findAll({ raw: true });
    const veterinarios = await Veterinario.findAll({ raw: true });
    res.render('prontuarios/form', { pets, veterinarios });
});

app.post('/prontuarios/cadastrar', async (req, res) => {
    await Prontuario.create(req.body);
    res.redirect('/prontuarios');
});

app.get('/prontuarios/editar/:id', async (req, res) => {
    const prontuario = await Prontuario.findByPk(req.params.id, { raw: true });
    const pets = await Pet.findAll({ raw: true });
    const veterinarios = await Veterinario.findAll({ raw: true });
    res.render('prontuarios/edit', { prontuario, pets, veterinarios });
});

app.post('/prontuarios/editar/:id', async (req, res) => {
    await Prontuario.update(req.body, { where: { id: req.params.id } });
    res.redirect('/prontuarios');
});

app.get('/prontuarios/excluir/:id', async (req, res) => {
    await Prontuario.destroy({ where: { id: req.params.id } });
    res.redirect('/prontuarios');
});

async function start() {
    try {
        await sequelize.sync();
        console.log('Banco sincronizado!');
        app.listen(3000, () => console.log('Servidor iniciado em http://localhost:3000'));
    } catch (e) {
        console.error('Erro ao sincronizar o banco:', e);
    }
}

start();