const {autentocaUsuarioDB} = require('../usecases/segurancaUseCases');
require('dotenv-safe').config();
const jwt = require('jsonwebtoken');

const login = async (request, response) => {
    await autentocaUsuarioDB(request.body)
        .then(funcionaios => {
            const token = jwt.sign({funcionaios}, process.env.SECRET, {
                expiresIN: 300 //expira em 5min
            })
            return response.json({auth: true, token: token })
        })
        .catch(err => response.status(401).json({auth: false, message: err }));

}
// verificação do token
function verificaJWT(request, response, next) {
    const token = request.headers['authorization'];
    if (!token) return response.status(401).json({ auth: false, message: 'Nenhum token recebido.' });

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err) return response.status(401).json({ auth: false, message: 'Erro ao autenticar o token.' });
        // Se o token for válido, salva no request para uso posterior
        console.log("Funcionario: " + JSON.stringify(decoded.funcionaios));
        request.funcionaios = decoded.funcionaios;
        next();
    });
}

module.exports = {
    login, verificaJWT
}