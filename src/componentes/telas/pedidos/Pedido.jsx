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
import { useNavigate } from "react-router-dom";

function Pedidos() {

    let navigate = useNavigate();

    const [carregando, setCarregando] = useState(true);
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
        try {
         setCarregando(true);
        setListaObjetos(await getPedidosAPI());
         setCarregando(false);
          } catch (err) {
            // tratamento para ir para a tela de login em caso de erro
            navigate("/login", { replace: true });
        }
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
        try {
        setObjeto(await getPedidoPorCodigoAPI(codigo));
        setEditar(true);
        setAlerta({ status: "", message: "" });
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
            let retornoAPI = await cadastraPedidoAPI(objeto, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);

            if (!editar) setEditar(true);

            recuperaPedidos();
        } catch (error) {
            console.error(error);
            navigate("/login", { replace: true });
        }
    };

    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    };

    const remover = async codigo => {
        try {
        if (window.confirm("Deseja remover este pedido?")) {
            let retornoAPI = await deletePedidoPorCodigoAPI(codigo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            recuperaPedidos();
        }
         } catch (err) {
            // tratamento para ir para a tela de login em caso de erro
            navigate("/login", { replace: true });
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
            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>
            <Formulario />
        </PedidosContext.Provider>
    );
}

export default Pedidos;
