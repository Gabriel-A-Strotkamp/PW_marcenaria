import { useContext } from 'react'
import ItensPedidoContext from './ItensPedidoContext';
import Alerta from '../../comuns/Alerta';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';

function Tabela() {

    const { alerta, listaObjetos, remover, novoObjeto, editarObjeto } = useContext(ItensPedidoContext);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Itens do Pedido</h1>
            <Alerta alerta={alerta} />
            <Button variant="primary" onClick={() => novoObjeto()}>
                Novo <i className="bi bi-file-earmark-plus"></i>
            </Button>

            {listaObjetos.length === 0 && <h1>Nenhum item encontrado</h1>}

            {listaObjetos.length > 0 && (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Ações</th>
                            <th>ID</th>
                            <th>Pedido</th>
                            <th>Material</th>
                            <th>Quantidade</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaObjetos.map((objeto) => (
                            <tr key={objeto.itemID}>
                                <td>
                                    <Button variant="info" onClick={() => editarObjeto(objeto.codigo)}>
                                        <i className="bi bi-pencil-square"></i>
                                    </Button>
                                    <Button variant="danger" onClick={() => remover(objeto.itemID)}>
                                        <i className="bi bi-trash"></i>
                                    </Button>
                                </td>
                                <td>{objeto.itemID}</td>
                                <td>{objeto.pedido}</td>
                                <td>{objeto.material}</td>
                                <td>{objeto.quantidade}</td>
                                <td>{objeto.valor}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
}

export default Tabela;
