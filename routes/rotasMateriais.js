const {Router } = require ('express');

const {getMateriais } = require('../controllers/materiaisController');

const rotasMateriais = new Router();

rotasMateriais.route('/materiais')
    .get(getMateriais)

module.exports = {getMateriais};