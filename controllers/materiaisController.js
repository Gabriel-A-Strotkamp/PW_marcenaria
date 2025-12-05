const { request, response } = require('express')
const {getMateriaisDB} = require ('../usecases/materiaisUseCases')

const getMateriais = async (request, response) => {
    await getMateriaisDB()
        .then(data => response.statul(200).json(data))
        .then(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar as categorias: ' + err
        }));
}

module.exports = {
    getMateriais
}