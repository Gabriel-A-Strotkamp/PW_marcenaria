const {
    getItensPedidoDB,
    getItemPedidoByIdDB,
    addItemPedidoDB,
    updateItemPedidoDB,
    deleteItemPedidoDB
} = require('../usecases/itenspedidoUseCases');

// GET ALL
const getItensPedido = async (req, res) => {
    try {
        const data = await getItensPedidoDB();
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

// GET BY ID
const getItemPedidoById = async (req, res) => {
    try {
        const item = await getItemPedidoByIdDB(req.params.id);
        if (!item)
            return res.status(404).json({ message: 'Item não encontrado' });

        res.status(200).json(item);
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

// INSERT
const addItemPedido = async (req, res) => {
    try {
        const novo = await addItemPedidoDB(req.body);
        res.status(201).json(novo);
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

// UPDATE
const updateItemPedido = async (req, res) => {
    try {
        const atualizado = await updateItemPedidoDB(req.body);
        res.status(200).json(atualizado);
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

// DELETE
const deleteItemPedido = async (req, res) => {
    try {
        const msg = await deleteItemPedidoDB(req.params.id);
        res.status(200).json({ message: msg });
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

module.exports = {
    getItensPedido,
    getItemPedidoById,
    addItemPedido,
    updateItemPedido,
    deleteItemPedido
};
