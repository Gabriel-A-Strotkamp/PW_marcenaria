import { useState, useEffect } from 'react';
import FuncionariosContext from './FuncionariosContext';
import {
    getFuncionariosAPI,
    deleteFuncionarioPorCodigoAPI
} from '../../../servicos/FuncionariosServico';

import Tabela from './Tabela';
import Formulario from './Formulario';
import { useNavigate } from "react-router-dom";
import WithAuth from "../../../seguranca/WithAuth";

function Funcionarios() {

    let navigate = useNavigate();

    const [carregando, setCarregando] = useState(true);
    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);

    const recuperaFuncionarios = async () => {
        try {
         setCarregando(true);
        setListaObjetos(await getFuncionariosAPI());
         setCarregando(false);
          } catch (err) {
            // tratamento para ir para a tela de login em caso de erro
            navigate("/login", { replace: true });
        }
    }

    const remover = async codigo => {
        try {
        if (window.confirm('Deseja remover este funcionário?')) {
            let retornoAPI = await deleteFuncionarioPorCodigoAPI(codigo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message })
            recuperaFuncionarios();

        }
         } catch (err) {
            // tratamento para ir para a tela de login em caso de erro
            navigate("/login", { replace: true });
        }
    }

    useEffect(() => {
        recuperaFuncionarios();
    }, []);

    return (
        <FuncionariosContext.Provider value={{
            alerta, setAlerta,
            listaObjetos,
            remover
        }}>
            <Carregando carregando={carregando}>
                                    <Tabela />
                        </Carregando>
            <Formulario />
        </FuncionariosContext.Provider>
    );
}

export default WithAuth(Funcionarios);
