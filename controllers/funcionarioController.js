const {
    getFuncionariosDB,
    addFuncionariosDB,
    updateFuncionariosDB,
    deleteFuncionariosDB
} = require('../usecases/funcionariosUseCases');

const getFuncionarios = async (req, res) => {
    try {
        const lista = await getFuncionariosDB();
        res.json(lista);
    } catch (err) {
        res.status(400).json({ erro: err });
    }
};

const addFuncionarios = async (req, res) => {
    try {
        const funcionario = await addFuncionariosDB(req.body);
        res.json(funcionario);
    } catch (err) {
        res.status(400).json({ erro: err });
    }
};

const updateFuncionarios = async (req, res) => {
    try {
        const funcionario = await updateFuncionariosDB(req.body);
        res.json(funcionario);
    } catch (err) {
        res.status(400).json({ erro: err });
    }
};

const deleteFuncionarios = async (req, res) => {
    try {
        const msg = await deleteFuncionariosDB(req.params.id);
        res.json({ mensagem: msg });
    } catch (err) {
        res.status(400).json({ erro: err });
    }
};

module.exports = {
    getFuncionarios,
    addFuncionarios,
    updateFuncionarios,
    deleteFuncionarios
};
