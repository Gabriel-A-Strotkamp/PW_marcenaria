const {Router } = require ('express');

const {getMateriais } = require('../controllers/materiaisController');

const {verificaJWT} = require('../controllers/segurancaController')

const rotasMateriais = new Router();

rotasMateriais.route('/materiais')
    .get(verificaJWT, getMateriais)

module.exports = {rotasMateriais};