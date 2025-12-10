export const getPedidosAPI = async () => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/pedidos`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    return await response.json();
}

export const getPedidoPorCodigoAPI = async (codigo) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/pedidos/${codigo}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    return await response.json();
}

export const deletePedidoPorCodigoAPI = async (codigo) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/pedidos/${codigo}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    });
    return await response.json();
}

export const cadastraPedidoAPI = async (objeto, metodo) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/pedidos`, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(objeto)
    });
    return await response.json();
}
