import { useContext } from 'react'
import Alerta from '../../comuns/Alerta';
import ItemPedidoContext from './ItemPedidoContext';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function Formulario() {

    const { objeto, handleChange, acaoCadastrar, alerta, exibirForm, setExibirForm } = useContext(ItemPedidoContext);

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

                            <Col xs={12} md={4}>
                                <FloatingLabel controlId="txtCodigo" label="Código" className="mb-3">
                                    <Form.Control type="text" readOnly name="itemId"
                                        value={objeto.itemId}
                                        onChange={handleChange} />
                                </FloatingLabel>
                            </Col>

                            <Col xs={12} md={4}>
                                <FloatingLabel controlId="txtPedidoId" label="Pedido" className="mb-3">
                                    <Form.Control type="number" required name="pedidoId"
                                        value={objeto.pedidoId}
                                        onChange={handleChange} placeholder="ID do pedido" />
                                </FloatingLabel>
                            </Col>

                            <Col xs={12} md={4}>
                                <FloatingLabel controlId="txtMaterialId" label="Material" className="mb-3">
                                    <Form.Control type="number" required name="materialId"
                                        value={objeto.materialId}
                                        onChange={handleChange} placeholder="ID do material" />
                                </FloatingLabel>
                            </Col>

                            <Col xs={12}>
                                <FloatingLabel controlId="txtQuantidade" label="Quantidade" className="mb-3">
                                    <Form.Control type="number" required name="quantidade"
                                        value={objeto.quantidade}
                                        onChange={handleChange} placeholder="0" />
                                </FloatingLabel>
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
