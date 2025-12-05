const {Router } = require('express');

const {rotasClientes} = require('./rotasClientes');
const {rotasItensPedido} = require('./rotasItensPedido');
const {rotasMateriais} = require('./rotasMateriais');
const {rotasPedidos} = require('./rotasPedidos');
const {login} = require('../controllers/segurancaController');

const rotas = new Router();

rotas.use(rotasClientes);
rotas.use(rotasItensPedido);
rotas.use(rotasMateriais);
rotas.use(rotasPedidos);

rotas.route("/login")
    .post(login)

module.exports = rotas;