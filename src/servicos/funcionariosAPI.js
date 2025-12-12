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

export const getFuncionariosAPI = async () => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/funcionarios`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "authorization": getToken() }
    });
    return await response.json();
}

export const getFuncionarioPorCodigoAPI = async (codigo) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/funcionarios/${codigo}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" , "authorization": getToken()}
    });
    return await response.json();
}

export const deleteFuncionarioPorCodigoAPI = async (codigo) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/funcionarios/${codigo}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" , "authorization": getToken()}
    });
    return await response.json();
}

export const cadastraFuncionarioAPI = async (objeto, metodo) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/funcionarios`, {
        method: metodo,
        headers: { "Content-Type": "application/json" , "authorization": getToken()},
        body: JSON.stringify(objeto)
    });
    return await response.json();
}
