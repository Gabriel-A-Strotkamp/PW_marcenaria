const { pool } = require('../config');
const Pedidos = require('../entities/Pedidos');

// GET ALL
const getPedidosDB = async () => {
    try {
        const { rows } = await pool.query('SELECT * FROM Pedidos ORDER BY pedidoId');
        return rows.map(p => new Pedidos(
            p.pedidoid, p.descricao, p.orcamento, p.data_inicio, p.data_entrega, p.cliente
        ));
    } catch (err) {
        throw "Erro ao listar pedidos: " + err;
    }
};

// GET BY ID
const getPedidoByIdDB = async (id) => {
    try {
        const { rows } = await pool.query('SELECT * FROM Pedidos WHERE pedidoId = $1', [id]);
        if (rows.length === 0) return null;

        const p = rows[0];
        return new Pedidos(
            p.pedidoid, p.descricao, p.orcamento, p.data_inicio, p.data_entrega, p.cliente
        );
    } catch (err) {
        throw "Erro ao buscar pedido: " + err;
    }
};

// INSERT
const addPedidoDB = async (body) => {
    try {
        const { descricao, orcamento, data_inicio, data_entrega, cliente } = body;

        const { rows } = await pool.query(
            `INSERT INTO Pedidos (descricao, orcamento, data_inicio, data_entrega, cliente)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [descricao, orcamento, data_inicio, data_entrega, cliente]
        );

        const p = rows[0];
        return new Pedidos(
            p.pedidoid, p.descricao, p.orcamento, p.data_inicio, p.data_entrega, p.cliente
        );
    } catch (err) {
        throw "Erro ao inserir pedido: " + err;
    }
};

// UPDATE
const updatePedidoDB = async (body) => {
    try {
        const { pedidoId, descricao, orcamento, data_inicio, data_entrega, cliente } = body;

        const { rows, rowCount } = await pool.query(
            `UPDATE Pedidos SET descricao = $2, orcamento = $3, data_inicio = $4,
             data_entrega = $5, cliente = $6
             WHERE pedidoId = $1
             RETURNING *`,
            [pedidoId, descricao, orcamento, data_inicio, data_entrega, cliente]
        );

        if (rowCount === 0) throw `Pedido ${pedidoId} não encontrado.`;

        const p = rows[0];
        return new Pedidos(
            p.pedidoid, p.descricao, p.orcamento, p.data_inicio, p.data_entrega, p.cliente
        );
    } catch (err) {
        throw "Erro ao atualizar pedido: " + err;
    }
};

// DELETE
const deletePedidoDB = async (id) => {
    try {
        const results = await pool.query('DELETE FROM Pedidos WHERE pedidoId = $1', [id]);

        if (results.rowCount === 0)
            throw `Pedido ${id} não encontrado para excluir.`;

        return "Pedido removido com sucesso.";
    } catch (err) {
        throw "Erro ao remover pedido: " + err;
    }
};

module.exports = {
    getPedidosDB,
    getPedidoByIdDB,
    addPedidoDB,
    updatePedidoDB,
    deletePedidoDB
};
