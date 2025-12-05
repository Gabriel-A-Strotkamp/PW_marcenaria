const {pool} = require('../config');
const Clientes = require ('../entities/Clientes')

const getClientesDB = async () => {
    try{
        const { rows } = await pool.query('SELECT * FROM Clientes ORDER BY nome');
        return rows.map((Clientes) => new Clientes(Clientes.clienteID, Clientes.nome));   
    }catch (err) {
        throw "Erro : " + err;
    }
}
const addClientesDB = async (body) => {
    try {   
        const { nome } = body; 
        const results = await pool.query(`INSERT INTO clientes (nome) 
            VALUES ($1)
            returning clienteID, nome`,
        [nome]);
        const Clientes = results.rows[0];
        return new Clientes(cliente.clienteID, cliente.nome); 
    } catch (err) {
        throw "Erro ao inserir o cliente: " + err;
    }    
}


const updateClientesDB = async (body) => {
    try {   
        const { clienteID, nome }  = body; 
        const results = await pool.query(`UPDATE Clientes set nome = $2 where clienteID = $1 
        returning clienteID, nome`,
        [clienteID, nome]);        
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o id ${clienteID} para ser alterado`;
        }
        const Clientes = results.rows[0];
        return new Clientes(clientes.clienteID, clientes.nome); 
    } catch (err) {
        throw "Erro ao alterar o cliente: " + err;
    }      
}

const deleteclienteDB = async (clienteID) => {
    try {           
        const results = await pool.query(`DELETE FROM clientes where clienteID = $1`,
        [clienteID]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o id ${clienteID} para ser removido`;
        } else {
            return "cliente removida com sucesso";
        }       
    } catch (err) {
        throw "Erro ao remover o cliente: " + err;
    }     
}

module.exports = {
    getClientesDB, addClientesDB, updateClientesDB, deleteclienteDB
}