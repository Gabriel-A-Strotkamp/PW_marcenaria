const { request, response } = require('express')
const {getPedidosDB} = require ('../usecases/pedidosUseCases')

const getPedidos = async (request, response) => {
    await getPedidosDB()
        .then(data => response.statul(200).json(data))
        .then(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar as categorias: ' + err
        }));
}

module.exports = {
    getPedidos
}