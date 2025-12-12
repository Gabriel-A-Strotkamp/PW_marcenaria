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
import { useNavigate } from "react-router-dom";
import WithAuth from "../../../seguranca/WithAuth";

function ItensPedido() {

    let navigate = useNavigate();

    const [carregando, setCarregando] = useState(true);
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
        try {
         setCarregando(true);
        setListaObjetos(await getItensPedidoAPI());
         setCarregando(false);
          } catch (err) {
            // tratamento para ir para a tela de login em caso de erro
            navigate("/login", { replace: true });
        }
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
        try {
        setObjeto(await getItemPedidoPorCodigoAPI(codigo));
        setEditar(true);
        setExibirForm(true);
         } catch (err) {
            // tratamento para ir para a tela de login em caso de erro
            navigate("/login", { replace: true });
        }
    };

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {

        let retornoAPI = await cadastraItemPedidoAPI(objeto, metodo);
        setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
        setObjeto(retornoAPI.objeto);

        if (!editar) setEditar(true);
        } catch (err) {
            console.log("Erro: " + err);
            // tratamento para ir para a tela de login em caso de erro
            navigate("/login", { replace: true });
        }
        recuperaItens();
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setObjeto({ ...objeto, [name]: value });
    };

    const remover = async codigo => {
        try {
        if (window.confirm("Deseja remover este item do pedido?")) {
            let retornoAPI = await deleteItemPedidoPorCodigoAPI(codigo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            recuperaItens();
        }
         } catch (err) {
            // tratamento para ir para a tela de login em caso de erro
            navigate("/login", { replace: true });
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
            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>
            <Formulario />
        </ItensPedidoContext.Provider>
    );
}


export default WithAuth(ItensPedido);
