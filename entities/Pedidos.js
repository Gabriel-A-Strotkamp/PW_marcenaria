class Pedidos{
    constructor(pedidoID, descricao, orcamento, 
        data_inicio, data_entrega, cliente){
        this.pedidoID = pedidoID;
        this.descricao = descricao;
        this.orcamento = orcamento;
        this.data_inicio = data_inicio;
        this.data_entrega = data_entrega;
        this.cliente = cliente;
    }
}

module.exports = Pedidos;