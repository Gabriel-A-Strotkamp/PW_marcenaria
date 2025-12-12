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

    // Carrega funcionários
    const recuperaFuncionarios = async () => {
        setListaObjetos(await getFuncionariosAPI());
    };

    // Novo cadastro
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

    // Editar registro
    const editarObjeto = async codigo => {
        setObjeto(await getFuncionarioPorCodigoAPI(codigo));
        setEditar(true);
        setExibirForm(true);
        setAlerta({ status: "", message: "" });
    };

    // Salvar
    const acaoCadastrar = async e => {
        e.preventDefault();

        let metodo = editar ? "PUT" : "POST";
        let retornoAPI = await cadastraFuncionarioAPI(objeto, metodo);

        setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
        setObjeto(retornoAPI.objeto);

        if (!editar) setEditar(true);

        recuperaFuncionarios();
    };

    // Atualiza estado dos inputs
    const handleChange = e => {
        const { name, value } = e.target;
        setObjeto({ ...objeto, [name]: value });
    };

    // Remover
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
            acaoCadastrar, handleChange,
            setExibirForm
        }}>
            <Tabela />
            <Formulario />
        </FuncionariosContext.Provider>
    );
}

export default Funcionarios;
