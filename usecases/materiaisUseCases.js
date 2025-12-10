const { pool } = require('../config');
const Materiais = require('../entities/Materiais');

// GET ALL
const getMateriaisDB = async () => {
    try {
        const { rows } = await pool.query('SELECT * FROM Materiais ORDER BY descricao');
        return rows.map(m => new Materiais(m.materialid, m.valor, m.descricao));
    } catch (err) {
        throw "Erro ao listar materiais: " + err;
    }
};

// GET BY ID
const getMaterialByIdDB = async (id) => {
    try {
        const { rows } = await pool.query('SELECT * FROM Materiais WHERE materialID = $1', [id]);
        if (rows.length === 0) return null;

        const m = rows[0];
        return new Materiais(m.materialid, m.valor, m.descricao);
    } catch (err) {
        throw "Erro ao buscar material: " + err;
    }
};

// INSERT
const addMaterialDB = async (body) => {
    try {
        const { valor, descricao } = body;

        const { rows } = await pool.query(
            `INSERT INTO Materiais (valor, descricao)
             VALUES ($1, $2)
             RETURNING *`,
            [valor, descricao]
        );

        const m = rows[0];
        return new Materiais(m.materialid, m.valor, m.descricao);
    } catch (err) {
        throw "Erro ao inserir material: " + err;
    }
};

// UPDATE
const updateMaterialDB = async (body) => {
    try {
        const { materialId, valor, descricao } = body;

        const { rows, rowCount } = await pool.query(
            `UPDATE Materiais SET valor = $2, descricao = $3
             WHERE materialID = $1
             RETURNING *`,
            [materialId, valor, descricao]
        );

        if (rowCount === 0) throw `Material ${materialId} não encontrado.`;

        const m = rows[0];
        return new Materiais(m.materialid, m.valor, m.descricao);
    } catch (err) {
        throw "Erro ao atualizar material: " + err;
    }
};

// DELETE
const deleteMaterialDB = async (id) => {
    try {
        const results = await pool.query('DELETE FROM Materiais WHERE materialID = $1', [id]);

        if (results.rowCount === 0)
            throw `Material ${id} não encontrado para excluir.`;

        return "Material removido com sucesso.";
    } catch (err) {
        throw "Erro ao remover material: " + err;
    }
};

module.exports = {
    getMateriaisDB,
    getMaterialByIdDB,
    addMaterialDB,
    updateMaterialDB,
    deleteMaterialDB
};
