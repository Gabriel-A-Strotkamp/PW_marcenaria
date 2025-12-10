class ItensPedido {
    constructor(itemId, pedido, material, quantidade, valor) {
        this.itemId = itemId;
        this.pedido = pedido;
        this.material = material;
        this.quantidade = quantidade;
        this.valor = valor;
    }
}

module.exports = ItensPedido;
