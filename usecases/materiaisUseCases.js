const {pool} = require('../config');
const Materiais = require ('../entities/Materiais')

const getMateriaisDB = async () => {
    try{
        const { rows } = await pool.query('SELECT * FROM Materiais ORDER BY descricao');
        return rows.map((Materiais) => new Materiais(Materiais.descricao, Materiais.valor));
    }catch (err) {
        throw "Erro : " + err;
    }
}

module.exports = {
    getMateriaisDB
}