const { pool } = require('../config');
const ItensPedido = require('../entities/ItensPedido');

// GET ALL
const getItensPedidoDB = async () => {
    try {
        const { rows } = await pool.query('SELECT * FROM ItensPedido ORDER BY itemID');
        return rows.map(i =>
            new ItensPedido(i.itemid, i.pedido, i.material, i.quantidade, i.valor)
        );
    } catch (err) {
        throw "Erro ao listar itens: " + err;
    }
};

// GET BY ID
const getItemPedidoByIdDB = async (id) => {
    try {
        const { rows } = await pool.query('SELECT * FROM ItensPedido WHERE itemID = $1', [id]);
        if (rows.length === 0) return null;

        const i = rows[0];
        return new ItensPedido(i.itemid, i.pedido, i.material, i.quantidade, i.valor);
    } catch (err) {
        throw "Erro ao buscar item: " + err;
    }
};

// INSERT
const addItemPedidoDB = async (body) => {
    try {
        const { pedido, material, quantidade, valor } = body;

        const { rows } = await pool.query(
            `INSERT INTO ItensPedido (pedido, material, quantidade, valor)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [pedido, material, quantidade, valor]
        );

        const i = rows[0];
        return new ItensPedido(i.itemid, i.pedido, i.material, i.quantidade, i.valor);
    } catch (err) {
        throw "Erro ao inserir item do pedido: " + err;
    }
};

// UPDATE
const updateItemPedidoDB = async (body) => {
    try {
        const { itemId, pedido, material, quantidade, valor } = body;

        const { rows, rowCount } = await pool.query(
            `UPDATE ItensPedido SET pedido = $2, material = $3, quantidade = $4, valor = $5
             WHERE itemID = $1
             RETURNING *`,
            [itemId, pedido, material, quantidade, valor]
        );

        if (rowCount === 0) throw `Item ${itemId} não encontrado.`;

        const i = rows[0];
        return new ItensPedido(i.itemid, i.pedido, i.material, i.quantidade, i.valor);
    } catch (err) {
        throw "Erro ao atualizar item: " + err;
    }
};

// DELETE
const deleteItemPedidoDB = async (id) => {
    try {
        const results = await pool.query('DELETE FROM ItensPedido WHERE itemID = $1', [id]);

        if (results.rowCount === 0)
            throw `Item ${id} não encontrado para excluir.`;

        return "Item do pedido removido com sucesso.";
    } catch (err) {
        throw "Erro ao remover item: " + err;
    }
};

module.exports = {
    getItensPedidoDB,
    getItemPedidoByIdDB,
    addItemPedidoDB,
    updateItemPedidoDB,
    deleteItemPedidoDB
};
