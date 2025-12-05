const {Router } = require ('express');

const {getItensPedido } = require('../controllers/itensPedidoController');

const rotasItensPedido = new Router();

rotasItensPedido.route('/itensPedido')
    .get(getItensPedido)

module.exports = {rotasItensPedido};