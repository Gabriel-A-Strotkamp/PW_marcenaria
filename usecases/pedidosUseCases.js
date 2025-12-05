const {pool} = require('../config');
const Pedidos = require ('../entities/Pedidos')

const getPedidosDB = async () => {
    try{
        const { rows } = await pool.query('SELECT * FROM Pedidos ORDER BY pedidoID');
        return rows.map((Pedidos) => new Pedidos(Pedidos.descricao, Pedidos.orcamento, Pedidos.data_inicio,
            Pedidos.data_entrega, Pedidos.cliente
        ));   
    }catch (err) {
        throw "Erro : " + err;
    }
}
const addPedidosDB = async (body) => {
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


const updatePedidosDB = async (body) => {
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

const deletePedidosDB = async (clienteID) => {
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
    getPedidosDB
}