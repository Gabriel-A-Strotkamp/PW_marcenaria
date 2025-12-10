const { pool } = require('../config');
const Clientes = require('../entities/Clientes');

// GET ALL
const getClientesDB = async () => {
    try {
        const { rows } = await pool.query('SELECT * FROM Clientes ORDER BY nome');
        return rows.map(c => new Clientes(c.clienteid, c.nome, c.telefone, c.endereco, c.cpf));
    } catch (err) {
        throw "Erro ao listar clientes: " + err;
    }
};

// GET BY ID
const getClienteByIdDB = async (id) => {
    try {
        const { rows } = await pool.query('SELECT * FROM Clientes WHERE clienteId = $1', [id]);
        if (rows.length === 0) return null;
        const c = rows[0];
        return new Clientes(c.clienteid, c.nome, c.telefone, c.endereco, c.cpf);
    } catch (err) {
        throw "Erro ao buscar cliente: " + err;
    }
};

// INSERT
const addClientesDB = async (body) => {
    try {
        const { nome, telefone, endereco, cpf } = body;

        const { rows } = await pool.query(
            `INSERT INTO Clientes (nome, telefone, endereco, cpf)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [nome, telefone, endereco, cpf]
        );

        const c = rows[0];
        return new Clientes(c.clienteid, c.nome, c.telefone, c.endereco, c.cpf);
    } catch (err) {
        throw "Erro ao inserir cliente: " + err;
    }
};

// UPDATE
const updateClientesDB = async (body) => {
    try {
        const { clienteId, nome, telefone, endereco, cpf } = body;

        const { rows, rowCount } = await pool.query(
            `UPDATE Clientes SET nome = $2, telefone = $3, endereco = $4, cpf = $5
             WHERE clienteId = $1
             RETURNING *`,
            [clienteId, nome, telefone, endereco, cpf]
        );

        if (rowCount === 0) throw `Cliente ${clienteId} não encontrado.`;

        const c = rows[0];
        return new Clientes(c.clienteid, c.nome, c.telefone, c.endereco, c.cpf);
    } catch (err) {
        throw "Erro ao atualizar cliente: " + err;
    }
};

// DELETE
const deleteClienteDB = async (id) => {
    try {
        const results = await pool.query('DELETE FROM Clientes WHERE clienteId = $1', [id]);

        if (results.rowCount === 0)
            throw `Cliente ${id} não encontrado para excluir.`;

        return "Cliente removido com sucesso.";
    } catch (err) {
        throw "Erro ao remover cliente: " + err;
    }
};

module.exports = {
    getClientesDB,
    getClienteByIdDB,
    addClientesDB,
    updateClientesDB,
    deleteClienteDB
};
