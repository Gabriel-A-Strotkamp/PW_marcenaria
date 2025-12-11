import { useState, useEffect } from "react";
import ItensPedidoContext from "./ItensPedidoContext";

import {
    getItensPedidoAPI,
    getItemPedidoPorCodigoAPI,
    cadastraItemPedidoAPI,
    deleteItemPedidoPorCodigoAPI
} from "../../../servicos/ItensPedidoServico";

import Tabela from "./Tabela";
import Formulario from "./formulario";

function ItensPedido() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);

    const [editar, setEditar] = useState(false);
    const [exibirForm, setExibirForm] = useState(false);

    const [objeto, setObjeto] = useState({
        itemID: "",
        pedido: "",
        material: "",
        quantidade: "",
        valor: ""
    });

    const recuperaItens = async () => {
        setListaObjetos(await getItensPedidoAPI());
    };

    const novoObjeto = () => {
        setEditar(false);
        setObjeto({
            itemID: "",
            pedido: "",
            material: "",
            quantidade: "",
            valor: ""
        });
        setAlerta({ status: "", message: "" });
        setExibirForm(true);
    };

    const editarObjeto = async codigo => {
        setObjeto(await getItemPedidoPorCodigoAPI(codigo));
        setEditar(true);
        setExibirForm(true);
    };

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";

        let retornoAPI = await cadastraItemPedidoAPI(objeto, metodo);
        setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
        setObjeto(retornoAPI.objeto);

        if (!editar) setEditar(true);

        recuperaItens();
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setObjeto({ ...objeto, [name]: value });
    };

    const remover = async codigo => {
        if (window.confirm("Deseja remover este item do pedido?")) {
            let retornoAPI = await deleteItemPedidoPorCodigoAPI(codigo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            recuperaItens();
        }
    };

    useEffect(() => {
        recuperaItens();
    }, []);

    return (
        <ItensPedidoContext.Provider value={{
            alerta, setAlerta,
            listaObjetos,
            remover,
            objeto, editar, exibirForm,
            novoObjeto, editarObjeto,
            acaoCadastrar, handleChange
        }}>
            <Tabela />
            <Formulario />
        </ItensPedidoContext.Provider>
    );
}

export default ItensPedido;
