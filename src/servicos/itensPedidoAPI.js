import { getToken } from '../seguranca/Autenticacao';

export const getCategoriaServico = async () => {
    const response = 
    await fetch(`${process.env.REACT_APP_ENDERECO_API}/categoria`,
    {
        method : "GET",
        headers : {
            "Content-Type" : "application/json",
            "authorization": getToken()
        }
    });
    const data = await response.json();
    return data;
}

export const getItensPedidoAPI = async () => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/itens-pedido`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "authorization": getToken() }
    });
    return await response.json();
}

export const getItemPedidoPorCodigoAPI = async (codigo) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/itens-pedido/${codigo}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" , "authorization": getToken()}
    });
    return await response.json();
}

export const deleteItemPedidoPorCodigoAPI = async (codigo) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/itens-pedido/${codigo}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" ,"authorization": getToken()}
    });
    return await response.json();
}

export const cadastraItemPedidoAPI = async (objeto, metodo) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/itens-pedido`, {
        method: metodo,
        headers: { "Content-Type": "application/json","authorization": getToken() },
        body: JSON.stringify(objeto)
    });
    return await response.json();
}
