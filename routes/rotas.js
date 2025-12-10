const { Router } = require('express');

const { rotasClientes } = require('./rotasClientes');
const { rotasItensPedido } = require('./rotasItensPedido');
const { rotasMateriais } = require('./rotasMateriais');
const { rotasPedidos } = require('./rotasPedidos');
const { rotasFuncionarios } = require('./rotasFuncionarios');

const { login, verificaJWT } = require('../controllers/segurancaController');
const gerenteOnly = require('../middlewares/gerenteOnly');

const rotas = new Router();

// 🔓 Rota pública (sem JWT)
rotas.post("/login", login);

// 🔐 Rotas que exigem autenticação
rotas.use(verificaJWT);

// 🔐 CRUD de clientes, itens, materiais e pedidos (qualquer funcionário autenticado)
rotas.use(rotasClientes);
rotas.use(rotasItensPedido);
rotas.use(rotasMateriais);
rotas.use(rotasPedidos);

// 🔐 CRUD dos funcionários — SOMENTE GERENTE
rotas.use("/funcionarios", gerenteOnly, rotasFuncionarios);

module.exports = rotas;
