const { request, response } = require('express');
const {
    getPedidosDB,
    getPedidoByIdDB,
    addPedidoDB,
    updatePedidoDB,
    deletePedidoDB
} = require('../usecases/pedidosUseCases');

// GET ALL
const getPedidos = async (request, response) => {
    try {
        const pedidos = await getPedidosDB();
        return response.status(200).json(pedidos);
    } catch (err) {
        return response.status(400).json({
            status: "error",
            message: "Erro ao consultar pedidos: " + err
        });
    }
};

// GET BY ID
const getPedidoById = async (request, response) => {
    try {
        const id = parseInt(request.params.id);
        const pedido = await getPedidoByIdDB(id);

        if (!pedido)
            return response.status(404).json({ message: "Pedido não encontrado." });

        return response.status(200).json(pedido);
    } catch (err) {
        return response.status(400).json({
            status: "error",
            message: "Erro ao consultar pedido: " + err
        });
    }
};

// INSERT
const addPedido = async (request, response) => {
    try {
        const novoPedido = await addPedidoDB(request.body);
        return response.status(201).json(novoPedido);
    } catch (err) {
        return response.status(400).json({
            status: "error",
            message: "Erro ao inserir pedido: " + err
        });
    }
};

// UPDATE
const updatePedido = async (request, response) => {
    try {
        const atualizado = await updatePedidoDB(request.body);
        return response.status(200).json(atualizado);
    } catch (err) {
        return response.status(400).json({
            status: "error",
            message: "Erro ao atualizar pedido: " + err
        });
    }
};

// DELETE
const deletePedido = async (request, response) => {
    try {
        const id = parseInt(request.params.id);
        const removido = await deletePedidoDB(id);
        return response.status(200).json({ message: removido });
    } catch (err) {
        return response.status(400).json({
            status: "error",
            message: "Erro ao remover pedido: " + err
        });
    }
};

module.exports = {
    getPedidos,
    getPedidoById,
    addPedido,
    updatePedido,
    deletePedido
};
