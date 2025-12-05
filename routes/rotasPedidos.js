const {Router } = require ('express');

const {getPedidos } = require('../controllers/pedidosController');

const {verificaJWT} = require('../controllers/segurancaController')

const rotasPedidos = new Router();

rotasPedidos.route('/pedidos')
    .get(verificaJWT, getPedidos)

module.exports = {rotasPedidos};