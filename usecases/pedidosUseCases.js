const { pool } = require('../config');
const Pedidos = require('../entities/Pedidos');

// GET ALL — agora com o nome do cliente
const getPedidosDB = async () => {
    try {
        const sql = `
            SELECT p.*, c.nome AS nomeCliente
            FROM Pedidos p
            INNER JOIN Clientes c ON c.clienteId = p.cliente
            ORDER BY p.pedidoId
        `;

        const { rows } = await pool.query(sql);

        return rows.map(p =>
            new Pedidos(
                p.pedidoid,
                p.descricao,
                p.orcamento,
                p.data_inicio,
                p.data_entrega,
                p.cliente,       // id do cliente
                p.nomecliente    // nome do cliente
            )
        );
    } catch (err) {
        throw "Erro ao listar pedidos: " + err;
    }
};

// GET BY ID
const getPedidoByIdDB = async (id) => {
    try {
        const sql = `
            SELECT p.*, c.nome AS nomeCliente
            FROM Pedidos p
            INNER JOIN Clientes c ON c.clienteId = p.cliente
            WHERE p.pedidoId = $1
        `;

        const { rows } = await pool.query(sql, [id]);
        if (rows.length === 0) return null;

        const p = rows[0];

        return new Pedidos(
            p.pedidoid,
            p.descricao,
            p.orcamento,
            p.data_inicio,
            p.data_entrega,
            p.cliente,
            p.nomecliente
        );
    } catch (err) {
        throw "Erro ao buscar pedido: " + err;
    }
};

// INSERT
const addPedidoDB = async (body) => {
    try {
        const { descricao, orcamento, data_inicio, data_entrega, cliente } = body;

        const sql = `
            INSERT INTO Pedidos (descricao, orcamento, data_inicio, data_entrega, cliente)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `;

        const { rows } = await pool.query(sql, [
            descricao, orcamento, data_inicio, data_entrega, cliente
        ]);

        const p = rows[0];
        return new Pedidos(
            p.pedidoid,
            p.descricao,
            p.orcamento,
            p.data_inicio,
            p.data_entrega,
            p.cliente,
            null    // só terá nome se fizer JOIN
        );

    } catch (err) {
        throw "Erro ao inserir pedido: " + err;
    }
};

// UPDATE
const updatePedidoDB = async (body) => {
    try {
        const { pedidoId, descricao, orcamento, data_inicio, data_entrega, cliente } = body;

        const sql = `
           UPDATE Pedidos 
           SET descricao = $2, orcamento = $3, data_inicio = $4,
               data_entrega = $5, cliente = $6
           WHERE pedidoId = $1
           RETURNING *
        `;

        const { rows, rowCount } = await pool.query(sql, [
            pedidoId, descricao, orcamento, data_inicio, data_entrega, cliente
        ]);

        if (rowCount === 0) throw `Pedido ${pedidoId} não encontrado.`;

        const p = rows[0];
        return new Pedidos(
            p.pedidoid,
            p.descricao,
            p.orcamento,
            p.data_inicio,
            p.data_entrega,
            p.cliente,
            null
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
