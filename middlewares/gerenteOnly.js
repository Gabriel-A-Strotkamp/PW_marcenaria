module.exports = (req, res, next) => {
    try {
        const cargo = req.funcionarios.cargo;

        if (cargo !== "G") {
            return res.status(403).json({
                erro: "Apenas gerentes podem acessar esta rota."
            });
        }

        next();
    } catch (err) {
        return res.status(403).json({ erro: "Acesso negado."});
    }
};
