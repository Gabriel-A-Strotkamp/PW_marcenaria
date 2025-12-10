// controllers/segurancaController.js
const { autentocaUsuarioDB } = require('../usecases/segurancaUseCases');
require('dotenv-safe').config();
const jwt = require('jsonwebtoken');

const login = async (request, response) => {
    try {
        const funcionario = await autentocaUsuarioDB(request.body);

        // Gerar token com cargo e ID do funcionário
        const token = jwt.sign(
            {
                id: funcionario.funcionarioid,
                nome: funcionario.nome,
                cargo: funcionario.cargo
            },
            process.env.SECRET,
            { expiresIn: 300 } // 5 minutos
        );

        return response.json({
            auth: true,
            token: token
        });

    } catch (err) {
        return response.status(401).json({
            auth: false,
            message: err
        });
    }
};

// Middleware para validar token
function verificaJWT(request, response, next) {
    const token = request.headers['authorization'];

    if (!token)
        return response.status(401).json({ auth: false, message: 'Nenhum token recebido.' });

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err)
            return response.status(401).json({ auth: false, message: 'Token inválido.' });

        console.log("Funcionário autenticado:", decoded);
        request.funcionarioLogado = decoded;
        next();
    });
}

module.exports = { login, verificaJWT };
