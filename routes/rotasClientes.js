const {Router } = require ('express');

const {getClientes } = require('../controllers/clientesController');

const {verificaJWT} = require('../controllers/segurancaController')

const rotasClientes = new Router();

rotasClientes.route('/clientes')
    .get(verificaJWT, getClientes)

module.exports = {rotasClientes};