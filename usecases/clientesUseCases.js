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

module.exports = {
    getClientesDB
}