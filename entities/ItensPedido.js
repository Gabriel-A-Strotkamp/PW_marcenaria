const Materiais = require ('./Materiais')


class ItensPedido{
    constructor(itensID, pedido, material, quantidade){
        this.itensID = itensID;
        this.pedido = pedido;
        this.material = material;
        this.quantidade = quantidade;
        this.valor = (console.log(Materiais.valor) * quantidade);
    }
}

module.exports = ItensPedido;