import { useContext } from 'react';
import PedidosContext from './PedidosContext';
import Alerta from '../../comuns/Alerta';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';

function Tabela() {

    const { alerta, listaObjetos, remover, novoObjeto, editarObjeto } = useContext(PedidosContext);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Pedidos</h1>
            <Alerta alerta={alerta} />

            <Button variant="primary" onClick={() => novoObjeto()}>
                Novo <i className="bi bi-file-earmark-plus"></i>
            </Button>

            {listaObjetos.length === 0 && <h1>Nenhum pedido encontrado</h1>}

            {listaObjetos.length > 0 && (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Ações</th>
                            <th>ID</th>
                            <th>Descrição</th>
                            <th>Orçamento</th>
                            <th>Data Início</th>
                            <th>Data Entrega</th>
                            <th>Cliente</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaObjetos.map(obj => (
                            <tr key={obj.pedidoId}>
                                <td align="center">
                                    <Button variant="info" onClick={() => editarObjeto(objeto.codigo)}>
                                        <i className="bi bi-pencil-square"></i>
                                    </Button>
                                    <Button variant="danger" onClick={() => remover(obj.pedidoId)}>
                                        <i className="bi bi-trash"></i>
                                    </Button>
                                </td>
                                <td>{obj.pedidoId}</td>
                                <td>{obj.descricao}</td>
                                <td>{obj.orcamento}</td>
                                <td>{obj.data_inicio}</td>
                                <td>{obj.data_entrega}</td>
                                <td>{obj.cliente}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
}

export default Tabela;
