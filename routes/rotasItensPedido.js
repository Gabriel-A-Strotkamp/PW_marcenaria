const {Router } = require ('express');

const {getItensPedido, getItemPedidoById, addItemPedido, updateItemPedido, deleteItemPedido } = require('../controllers/itensPedidoController');

const {verificaJWT} = require('../controllers/segurancaController')

const rotasItensPedido = new Router();

rotasItensPedido.get('/itensPedido',verificaJWT, getItensPedido);

// BUSCAR POR ID
rotasItensPedido.get('/itensPedido/:id',verificaJWT, getItemPedidoById);

// INSERIR
rotasItensPedido.post('/itensPedido',verificaJWT, addItemPedido);

// ALTERAR
rotasItensPedido.put('/itensPedido',verificaJWT, updateItemPedido);

// REMOVER
rotasItensPedido.delete('/itensPedido/:id', verificaJWT, deleteItemPedido);

module.exports = {rotasItensPedido};