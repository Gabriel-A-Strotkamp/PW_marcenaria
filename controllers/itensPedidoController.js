const { request, response } = require('express')
const {getItensPedidodb} = require ('../usecases/itenspedidoUseCases')

const getItensPedido = async (request, response) => {
    await getItensPedidodb()
        .then(data => response.statul(200).json(data))
        .then(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar as categorias: ' + err
        }));
}

module.exports = {
    getItensPedido
}