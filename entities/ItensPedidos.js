import { Materiais } from "./Materiais.js";

class ItensPedidos{
    constructor(itensID, pedido, material, quantidade){
        this.itensID = itensID;
        this.pedido = pedido;
        this.material = material;
        this.quantidade = quantidade;
        this.valor = (console.log(Materiais.valor) * quantidade);
    }
}

module.exports = ItensPedidos;