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
const addMateriaisDB = async (body) => {
    try {   
        const { nome } = body; 
        const results = await pool.query(`INSERT INTO Materiais (descricao) 
            VALUES ($1)
            returning materialID, descricao, valor`,
        [nome]);
        const materiais = results.rows[0];
        return new materiais(materiais.materialID, materiais.descricao, materiais.valor); 
    } catch (err) {
        throw "Erro ao inserir o cliente: " + err;
    }    
}


const updateMateriasDB = async (body) => {
    try {   
        const {descricao, valor}  = body; 
        const results = await pool.query(`UPDATE Materias set valor = $3 where descricao = $2 where materialID = $1
        returning, materialID, descricao, valor`,
        [materialID, descricao, valor]);        
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o id ${materialID} para ser alterado`;
        }
        const Materiais = results.rows[0];
        return new Materiais(Materiais.materialID, Materiais.descricao, materiais.valor); 
    } catch (err) {
        throw "Erro ao alterar o Material: " + err;
    }      
}

const deleteMateriaisDB = async (materialID) => {
    try {           
        const results = await pool.query(`DELETE FROM materiais where materialID = $1`,
        [materialID]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o id ${materialID} para ser removido`;
        } else {
            return "material removida com sucesso";
        }       
    } catch (err) {
        throw "Erro ao remover o Mateiral: " + err;
    }     
}

module.exports = {
    getMateriaisDB, addMateriaisDB, updateMateriasDB, deleteMateriaisDB
}