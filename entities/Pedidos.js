class Pedidos {
    constructor(id, descricao, orcamento, data_inicio, data_entrega, clienteId, nomeCliente) {
        this.id = id;
        this.descricao = descricao;
        this.orcamento = orcamento;
        this.data_inicio = data_inicio;
        this.data_entrega = data_entrega;
        this.clienteId = clienteId;
        this.nomeCliente = nomeCliente;
    }
}


module.exports = Pedidos;
