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

module.exports = {
    getClientesDB
}