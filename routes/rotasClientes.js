const { Router } = require('express');

const { 
    getClientes,
    getClienteById,
    addCliente,
    updateCliente,
    deleteCliente
} = require('../controllers/clientesController');

const { verificaJWT } = require('../controllers/segurancaController');

const rotasClientes = new Router();

// LISTAR TODOS
rotasClientes.get('/clientes', verificaJWT, getClientes);

// BUSCAR POR ID
rotasClientes.get('/clientes/:id',verificaJWT, getClienteById);

// INSERIR
rotasClientes.post('/clientes',verificaJWT, addCliente);

// ALTERAR
rotasClientes.put('/clientes',verificaJWT, updateCliente);

// REMOVER
rotasClientes.delete('/clientes/:id',verificaJWT, deleteCliente);

module.exports = { rotasClientes };
