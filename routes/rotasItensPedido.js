const {Router } = require ('express');

const {getItensPedido } = require('../controllers/itensPedidoController');

const {verificaJWT} = require('../controllers/segurancaController')

const rotasItensPedido = new Router();

rotasItensPedido.route('/itensPedido')
    .get(verificaJWT, getItensPedido)

module.exports = {rotasItensPedido};