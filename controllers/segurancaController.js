// controllers/segurancaController.js
const { autenticaFuncionarioDB } = require('../usecases/segurancaUseCases');
require('dotenv-safe').config();
const jwt = require('jsonwebtoken');

const login = async (request, response) => {
    try {
        await autenticaFuncionarioDB(request.body)
        .then(funcionario => {

        const token = jwt.sign(
            {funcionario}, process.env.SECRET,
            { expiresIn: 300 } // 5 min
        );

        return response.json({ auth: true, token });
    })
    } catch (err) {
        return response.status(401).json({ auth: false, message: err });
    }
};

// Middleware
function verificaJWT(request, response, next) {
    const token = request.headers['authorization'];

    if (!token)
        return response.status(401).json({ auth: false, message: 'Nenhum token recebido.' });

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err)
            return response.status(401).json({ auth: false, message: 'Token inválido.'});
        
        console.log("Funcionario: " + JSON.stringify(decoded.funcionario));
        request.funcionarioLogado = decoded.funcionario;
        next();
    });
}

module.exports = { login, verificaJWT };
