const {Router } = require ('express');

const {getMaterias } = require('../controllers/materiaisController');

const rotasMaterias = new Router();

rotasMaterias.route('/materias')
    .get(getMaterias)

module.exports = {rotasMaterias};