export const getClientesAPI = async () => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/clientes`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    return await response.json();
}

export const getClientePorCodigoAPI = async (codigo) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/clientes/${codigo}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    return await response.json();
}

export const deleteClientePorCodigoAPI = async (codigo) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/clientes/${codigo}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    });
    return await response.json();
}

export const cadastraClienteAPI = async (objeto, metodo) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/clientes`, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(objeto)
    });
    return await response.json();
}
