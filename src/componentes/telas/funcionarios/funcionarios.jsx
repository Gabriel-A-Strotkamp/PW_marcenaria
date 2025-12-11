import { useState, useEffect } from 'react';
import FuncionariosContext from './FuncionariosContext';
import {
    getFuncionariosAPI,
    deleteFuncionarioPorCodigoAPI
} from '../../../servicos/FuncionariosServico';

import Tabela from './Tabela';
import Formulario from './Formulario';

function Funcionarios() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);

    const recuperaFuncionarios = async () => {
        setListaObjetos(await getFuncionariosAPI());
    }

    const remover = async codigo => {
        if (window.confirm('Deseja remover este funcionário?')) {
            let retornoAPI = await deleteFuncionarioPorCodigoAPI(codigo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message })
            recuperaFuncionarios();
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
            <Tabela />
            <Formulario />
        </FuncionariosContext.Provider>
    );
}

export default Funcionarios;
