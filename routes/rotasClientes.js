const {Router } = require ('express');

const {getClientes } = require('../controllers/clientesController');

const rotasClientes = new Router();

rotasClientes.route('/clientes')
    .get(getClientes)

module.exports = {rotasClientes};