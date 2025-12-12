const {Router } = require ('express');

const {getMateriais, getMaterialById, addMaterial, updateMaterial, deleteMaterial } = require('../controllers/materiaisController');

const {verificaJWT} = require('../controllers/segurancaController')

const rotasMateriais = new Router();

// LISTAR TODOS
rotasMateriais.get('/materiais', verificaJWT, getMateriais);

// BUSCAR POR ID
rotasMateriais.get('/materiais/:id', verificaJWT, getMaterialById);

// INSERIR
rotasMateriais.post('/materiais', verificaJWT, addMaterial);

// ALTERAR
rotasMateriais.put('/materiais',verificaJWT, updateMaterial);

// REMOVER
rotasMateriais.delete('/materiais/:id', verificaJWT, deleteMaterial);

module.exports = {rotasMateriais};