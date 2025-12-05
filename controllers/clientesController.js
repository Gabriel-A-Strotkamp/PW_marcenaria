const { request, response } = require('express')
const {getClientesDB} = require ('../usecases/clientesUseCases')

const getClientes = async (request, response) => {
    await getClientesDB()
        .then(data => response.statul(200).json(data))
        .then(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar as categorias: ' + err
        }));
}

module.exports = {
    getClientes
}