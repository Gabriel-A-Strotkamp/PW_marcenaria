import { useState, useEffect } from "react";
import PedidosContext from "./PedidosContext";

import {
    getPedidosAPI,
    getPedidoPorCodigoAPI,
    cadastraPedidoAPI,
    deletePedidoPorCodigoAPI
} from "../../../servicos/PedidosServico";

import Tabela from "./tabela";
import Formulario from "./formulario";

function Pedidos() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);

    const [editar, setEditar] = useState(false);
    const [exibirForm, setExibirForm] = useState(false);

    const [objeto, setObjeto] = useState({
        pedidoId: "",
        descricao: "",
        orcamento: "",
        data_inicio: "",
        data_entrega: "",
        cliente: ""
    });

    const recuperaPedidos = async () => {
        setListaObjetos(await getPedidosAPI());
    };

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            pedidoId: "",
            descricao: "",
            orcamento: "",
            data_inicio: "",
            data_entrega: "",
            cliente: ""
        });
        setExibirForm(true);
    };

    const editarObjeto = async codigo => {
        setObjeto(await getPedidoPorCodigoAPI(codigo));
        setEditar(true);
        setAlerta({ status: "", message: "" });
        setExibirForm(true);
    };

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";

        try {
            let retornoAPI = await cadastraPedidoAPI(objeto, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);

            if (!editar) setEditar(true);

            recuperaPedidos();
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    };

    const remover = async codigo => {
        if (window.confirm("Deseja remover este pedido?")) {
            let retornoAPI = await deletePedidoPorCodigoAPI(codigo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            recuperaPedidos();
        }
    };

    useEffect(() => {
        recuperaPedidos();
    }, []);

    return (
        <PedidosContext.Provider value={{
            alerta, setAlerta,
            listaObjetos,
            remover,
            objeto, editar, exibirForm,
            novoObjeto, editarObjeto,
            acaoCadastrar, handleChange
        }}>
            <Tabela />
            <Formulario />
        </PedidosContext.Provider>
    );
}

export default Pedidos;
