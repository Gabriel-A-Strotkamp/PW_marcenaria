const {Router } = require ('express');

const {getPedidos } = require('../controllers/pedidosController');

const rotasPedidos = new Router();

rotasPedidos.route('/pedidos')
    .get(getPedidos)

module.exports = {rotasPedidos};