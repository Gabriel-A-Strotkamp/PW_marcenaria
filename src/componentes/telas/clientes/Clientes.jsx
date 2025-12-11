import { useState, useEffect } from 'react';
import ClientesContext from './ClientesContext';
import {
    getClientesAPI,
    getClientePorCodigoAPI,
    deleteClientePorCodigoAPI,
    cadastraClienteAPI
} from '../../../servicos/ClientesServico';

import Tabela from './tabela';
import Formulario from './formulario';

function Clientes() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);

    const [editar, setEditar] = useState(false);
    const [exibirForm, setExibirForm] = useState(false);

    const [objeto, setObjeto] = useState({
        clienteId: 0,
        nome: "",
        telefone: "",
        endereco: "",
        cpf: ""
    });

    const recuperaClientes = async () => {
        setListaObjetos(await getClientesAPI());
    }

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({ clienteId: 0, nome: "", telefone: "", endereco: "", cpf: "" });
        setExibirForm(true);
    }

    const editarObjeto = async (id) => {
        setObjeto(await getClientePorCodigoAPI(id));
        setEditar(true);
        setAlerta({ status: "", message: "" });
        setExibirForm(true);
    }

    const acaoCadastrar = async (e) => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";

        try {
            let retornoAPI = await cadastraClienteAPI(objeto, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);
            if (!editar) setEditar(true);
        } catch (err) {
            console.error(err);
        }
        recuperaClientes();
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setObjeto({ ...objeto, [name]: value });
    }

    const remover = async (id) => {
        if (window.confirm("Deseja remover este cliente?")) {
            const retornoAPI = await deleteClientePorCodigoAPI(id);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            recuperaClientes();
        }
    }

    useEffect(() => { recuperaClientes(); }, []);

    return (
        <ClientesContext.Provider value={{
            listaObjetos, alerta, remover,
            objeto, editarObjeto, novoObjeto,
            acaoCadastrar, handleChange, exibirForm, setExibirForm
        }}>
            <Tabela />
            <Formulario />
        </ClientesContext.Provider>
    );
}

export default Clientes;
