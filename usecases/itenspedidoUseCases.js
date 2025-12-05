const {pool} = require('../config');
const itensPedido = require ('../entities/ItensPedido')

const getItensPedidoDB = async () => {
    try{
        const { rows } = await pool.query('SELECT * FROM ItensPedido ORDER BY quantidade');
        return rows.map((itensPedido) => new ItensPedido(ItensPedido.pedido, ItensPedido.material, ItensPedido.quantidade));   
    }catch (err) {
        throw "Erro : " + err;
    }
}

module.exports = {
    getItensPedidoDB
}