import { useState, useEffect } from "react";
import MateriaisContext from "./MateriaisContext";

import {
    getMateriaisAPI,
    getMaterialPorCodigoAPI,
    cadastraMaterialAPI,
    deleteMaterialPorCodigoAPI
} from "../../../servicos/MateriaisServico";

import Tabela from "./Tabela";
import Formulario from "./formulario";
import { useNavigate } from "react-router-dom";
import WithAuth from "../../../seguranca/WithAuth";

function Materiais() {

    let navigate = useNavigate();

    const [carregando, setCarregando] = useState(true);
    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);

    const [editar, setEditar] = useState(false);
    const [exibirForm, setExibirForm] = useState(false);

    const [objeto, setObjeto] = useState({
        materialID: "",
        valor: "",
        descricao: ""
    });

    const recuperaMateriais = async () => {
        try {
         setCarregando(true);
        setListaObjetos(await getMateriaisAPI());
         setCarregando(false);
          } catch (err) {
            // tratamento para ir para a tela de login em caso de erro
            navigate("/login", { replace: true });
        }
    };

    const novoObjeto = () => {
        setEditar(false);
        setObjeto({
            materialID: "",
            valor: "",
            descricao: ""
        });
        setAlerta({ status: "", message: "" });
        setExibirForm(true);
    };

    const editarObjeto = async codigo => {
        try {
        setObjeto(await getMaterialPorCodigoAPI(codigo));
        setEditar(true);
        setExibirForm(true);
         } catch (err) {
            // tratamento para ir para a tela de login em caso de erro
            navigate("/login", { replace: true });
        }
    };

    const acaoCadastrar = async e => {
        try {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";

        let retornoAPI = await cadastraMaterialAPI(objeto, metodo);
        setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
        setObjeto(retornoAPI.objeto);

        if (!editar) setEditar(true);
        } catch (err) {
            console.log("Erro: " + err);
            // tratamento para ir para a tela de login em caso de erro
            navigate("/login", { replace: true });
        }
        recuperaMateriais();
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setObjeto({ ...objeto, [name]: value });
    };

    const remover = async codigo => {
        try {
        if (window.confirm("Deseja remover este material?")) {
            let retornoAPI = await deleteMaterialPorCodigoAPI(codigo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            recuperaMateriais();
        }
         } catch (err) {
            // tratamento para ir para a tela de login em caso de erro
            navigate("/login", { replace: true });
        }
    };

    useEffect(() => {
        recuperaMateriais();
    }, []);

    return (
        <MateriaisContext.Provider value={{
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
        </MateriaisContext.Provider>
    );
}

export default WithAuth(Materiais);