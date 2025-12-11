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

function Materiais() {

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
        setListaObjetos(await getMateriaisAPI());
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
        setObjeto(await getMaterialPorCodigoAPI(codigo));
        setEditar(true);
        setExibirForm(true);
    };

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";

        let retornoAPI = await cadastraMaterialAPI(objeto, metodo);
        setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
        setObjeto(retornoAPI.objeto);

        if (!editar) setEditar(true);

        recuperaMateriais();
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setObjeto({ ...objeto, [name]: value });
    };

    const remover = async codigo => {
        if (window.confirm("Deseja remover este material?")) {
            let retornoAPI = await deleteMaterialPorCodigoAPI(codigo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            recuperaMateriais();
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
            <Tabela />
            <Formulario />
        </MateriaisContext.Provider>
    );
}

export default Materiais;
