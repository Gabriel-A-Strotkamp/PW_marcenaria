import { useState, useEffect } from "react";
import FuncionariosContext from "./FuncionariosContext";

import {
    getFuncionariosAPI,
    getFuncionarioPorCodigoAPI,
    cadastraFuncionarioAPI,
    deleteFuncionarioPorCodigoAPI
} from "../../../servicos/FuncionariosServico";

import Tabela from "./Tabela";
import Formulario from "./Formulario";

function Funcionarios() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);

    const [editar, setEditar] = useState(false);
    const [exibirForm, setExibirForm] = useState(false);

    const [objeto, setObjeto] = useState({
        id: "",
        nome: "",
        cpf: "",
        senha: "",
        cargo: "",
        telefone: ""
    });

    const recuperaFuncionarios = async () => {
        setListaObjetos(await getFuncionariosAPI());
    };

    const novoObjeto = () => {
        setEditar(false);
        setObjeto({
            id: "",
            nome: "",
            cpf: "",
            senha: "",
            cargo: "",
            telefone: ""
        });
        setAlerta({ status: "", message: "" });
        setExibirForm(true);
    };

    const editarObjeto = async codigo => {
        setObjeto(await getFuncionarioPorCodigoAPI(codigo));
        setEditar(true);
        setExibirForm(true);
        setAlerta({ status: "", message: "" });
    };

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";

        let retornoAPI = await cadastraFuncionarioAPI(objeto, metodo);
        setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
        setObjeto(retornoAPI.objeto);

        if (!editar) setEditar(true);

        recuperaFuncionarios();
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setObjeto({ ...objeto, [name]: value });
    };

    const remover = async codigo => {
        if (window.confirm("Deseja remover este funcionário?")) {
            let retornoAPI = await deleteFuncionarioPorCodigoAPI(codigo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            recuperaFuncionarios();
        }
    };

    useEffect(() => {
        recuperaFuncionarios();
    }, []);

    return (
        <FuncionariosContext.Provider value={{
            alerta, setAlerta,
            listaObjetos,
            remover,
            objeto, editar, exibirForm,
            novoObjeto, editarObjeto,
            acaoCadastrar, handleChange
        }}>
            <Tabela />
            <Formulario />
        </FuncionariosContext.Provider>
    );
}

export default Funcionarios;
