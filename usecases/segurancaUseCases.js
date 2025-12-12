// usecases/segurancaUseCases.js
const { pool } = require('../config');

const autenticaFuncionarioDB = async (body) => {
    try {
        const { cpf, senha } = body;

        const results = await pool.query(
            'SELECT * FROM Funcionarios WHERE cpf = $1 AND senha = $2',
            [cpf, senha]
        );

        if (results.rowCount === 0) {
            throw "Usuário ou Senha inválidos";
        }

        // retorna o funcionário encontrado
        return results.rows[0];

    } catch (err) {
        throw "Erro ao autenticar o usuário: " + err;
    }
};

module.exports = {
    autenticaFuncionarioDB
};
