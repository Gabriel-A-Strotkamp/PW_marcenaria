import { useContext } from 'react'
import Alerta from '../../comuns/Alerta';
import ItemPedidoContext from './ItemPedidoContext';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CampoEntrada from '../../comuns/CampoEntrada';

function Formulario() {

    const { objeto, handleChange, acaoCadastrar, alerta, exibirForm, setExibirForm } =
        useContext(ItemPedidoContext);

    return (
        <Modal show={exibirForm} onHide={() => setExibirForm(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Item do Pedido</Modal.Title>
            </Modal.Header>

            <form id="formulario" onSubmit={acaoCadastrar}>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Alerta alerta={alerta} />

                            {/* Código */}
                            <Col xs={12} md={4}>
                                <CampoEntrada
                                    id="txtCodigo"
                                    label="Código"
                                    tipo="text"
                                    name="itemId"
                                    value={objeto.itemId}
                                    onchange={handleChange}
                                    requerido={false}
                                    readonly={true}
                                    msgvalido="Ok!"
                                    msginvalido=""
                                    maxCaracteres={10}
                                />
                            </Col>

                            {/* Pedido */}
                            <Col xs={12} md={4}>
                                <CampoEntrada
                                    id="txtPedidoId"
                                    label="Pedido"
                                    tipo="number"
                                    name="pedidoId"
                                    value={objeto.pedidoId}
                                    onchange={handleChange}
                                    requerido={true}
                                    readonly={false}
                                    msgvalido="OK"
                                    msginvalido="Informe o ID do pedido"
                                    maxCaracteres={10}
                                />
                            </Col>

                            {/* Material */}
                            <Col xs={12} md={4}>
                                <CampoEntrada
                                    id="txtMaterialId"
                                    label="Material"
                                    tipo="number"
                                    name="materialId"
                                    value={objeto.materialId}
                                    onchange={handleChange}
                                    requerido={true}
                                    readonly={false}
                                    msgvalido="OK"
                                    msginvalido="Informe o ID do material"
                                    maxCaracteres={10}
                                />
                            </Col>

                            {/* Quantidade */}
                            <Col xs={12}>
                                <CampoEntrada
                                    id="txtQuantidade"
                                    label="Quantidade"
                                    tipo="number"
                                    name="quantidade"
                                    value={objeto.quantidade}
                                    onchange={handleChange}
                                    requerido={true}
                                    readonly={false}
                                    msgvalido="OK"
                                    msginvalido="Informe a quantidade"
                                    maxCaracteres={10}
                                />
                            </Col>

                        </Row>
                    </Container>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setExibirForm(false)}>
                        Fechar
                    </Button>

                    <Button variant="success" type="submit">
                        Salvar <i className="bi bi-save"></i>
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

export default Formulario;
