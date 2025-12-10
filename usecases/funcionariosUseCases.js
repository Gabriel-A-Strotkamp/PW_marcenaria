const { pool } = require('../config');
const Funcionarios = require('../entities/Funcionarios');

// 🔹 GET
const getFuncionariosDB = async () => {
    const results = await pool.query(`SELECT * FROM Funcionarios ORDER BY nome`);
    return results.rows.map(f => new Funcionarios(f.id, f.nome, f.cpf, f.cargo, f.telefone));
};

// 🔹 POST
const addFuncionariosDB = async (body) => {
    const { nome, cpf, senha, cargo, telefone } = body;

    const results = await pool.query(
        `INSERT INTO Funcionarios (nome, cpf, senha, cargo, telefone)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id, nome, cpf, cargo, telefone`,
        [nome, cpf, senha, cargo, telefone]
    );

    const f = results.rows[0];
    return new Funcionarios(f.id, f.nome, f.cpf, f.cargo, f.telefone);
};

// 🔹 PUT
const updateFuncionariosDB = async (body) => {
    const { id, nome, cpf, senha, cargo, telefone } = body;

    const results = await pool.query(
        `UPDATE Funcionarios
         SET nome=$2, cpf=$3, senha=$4, cargo=$5, telefone=$6
         WHERE id=$1
         RETURNING id, nome, cpf, cargo, telefone`,
        [id, nome, cpf, senha, cargo, telefone]
    );

    if (results.rowCount === 0)
        throw `Nenhum funcionário encontrado com ID ${id}`;

    const f = results.rows[0];
    return new Funcionarios(f.id, f.nome, f.cpf, f.cargo, f.telefone);
};

// 🔹 DELETE
const deleteFuncionariosDB = async (id) => {
    const results = await pool.query(
        `DELETE FROM Funcionarios WHERE id=$1`,
        [id]
    );

    if (results.rowCount === 0)
        throw `Nenhum funcionário encontrado com ID ${id}`;

    return "Funcionário removido com sucesso!";
};

module.exports = {
    getFuncionariosDB,
    addFuncionariosDB,
    updateFuncionariosDB,
    deleteFuncionariosDB
};
