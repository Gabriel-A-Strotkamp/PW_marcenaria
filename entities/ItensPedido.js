class ItensPedido {
    constructor(itemId, pedido, materialDescricao, quantidade, valor) {
        this.itemId = itemId;
        this.pedido = pedido;
        this.material = materialDescricao; // agora descrição
        this.quantidade = quantidade;
        this.valor = valor;
    }
}


module.exports = ItensPedido;
