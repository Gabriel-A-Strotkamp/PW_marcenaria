const { Router } = require('express');
const router = Router();

const {
    getFuncionarios,
    addFuncionarios,
    updateFuncionarios,
    deleteFuncionarios
} = require('../controllers/funcionarioController');

// Todas as rotas daqui já passam pelo middleware gerenteOnly na classe principal

router.get("/funcionarios", getFuncionarios);
router.post("/funcionarios", addFuncionarios);
router.put("/funcionarios", updateFuncionarios);
router.delete("/funcionarios/:id", deleteFuncionarios);

module.exports = { rotasFuncionarios: router };
