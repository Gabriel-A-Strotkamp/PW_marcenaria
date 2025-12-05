const { pool } = require('../config')
const Funcionarios = require ('../entities/Funcionarios')

const autenticaFuncionarioDB = async (body) => {
    try {
        const {cpf, senha } = body
        const results = await pool.query('SELECT * FROM Funcionarios WHERE cpf = $1 and senha = $2',
            [cpf, senha]);
        
        if (results.rowCount == 0){
            throw "Usuário ou Senha inválidos";        
        }
        const Funcionarios = results.rows[0];
    } catch {
        throw "Erro ao autentificar o usuário: " + err;
    }
}

module.exports ={
    autenticaFuncionarioDB
}