const {Router } = require ('express');

const {getPedidos, getPedidoById, addPedido, updatePedido, deletePedido } = require('../controllers/pedidosController');

const {verificaJWT} = require('../controllers/segurancaController')

const rotasPedidos = new Router();

// LISTAR TODOS
rotasPedidos.get('/pedidos', verificaJWT, getPedidos);

// BUSCAR POR ID
rotasPedidos.get('/pedidos/:id', verificaJWT, getPedidoById);

// INSERIR
rotasPedidos.post('/pedidos', verificaJWT, addPedido);

// ALTERAR
rotasPedidos.put('/pedidos',verificaJWT, updatePedido);

// REMOVER
rotasPedidos.delete('/pedidos/:id', verificaJWT, deletePedido);

module.exports = {rotasPedidos};