import { useContext } from 'react'
import Alerta from '../../comuns/Alerta';
import PedidoContext from './PedidoContext';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function Formulario() {

    const { objeto, handleChange, acaoCadastrar, alerta, exibirForm, setExibirForm } = useContext(PedidoContext);

    return (
        <Modal show={exibirForm} onHide={() => setExibirForm(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Pedido</Modal.Title>
            </Modal.Header>

            <form id="formulario" onSubmit={acaoCadastrar}>
                <Modal.Body>
                    <Container>
                        <Row>

                            <Alerta alerta={alerta} />

                            <Col xs={12} md={6}>
                                <FloatingLabel controlId="txtCodigo" label="Código" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        readOnly
                                        name="pedidoId"
                                        value={objeto.pedidoId}
                                        onChange={handleChange}
                                    />
                                </FloatingLabel>
                            </Col>

                            <Col xs={12} md={6}>
                                <FloatingLabel controlId="txtDescricao" label="Descrição" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        required
                                        name="descricao"
                                        value={objeto.descricao}
                                        onChange={handleChange}
                                        placeholder="Descrição do pedido"
                                    />
                                </FloatingLabel>
                            </Col>

                            <Col xs={12} md={6}>
                                <FloatingLabel controlId="txtOrcamento" label="Orçamento" className="mb-3">
                                    <Form.Control
                                        type="number"
                                        required
                                        name="orcamento"
                                        value={objeto.orcamento}
                                        onChange={handleChange}
                                        placeholder="0.00"
                                    />
                                </FloatingLabel>
                            </Col>

                            <Col xs={12} md={6}>
                                <FloatingLabel controlId="txtDataInicio" label="Data início" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        required
                                        name="data_inicio"
                                        value={objeto.data_inicio}
                                        onChange={handleChange}
                                        placeholder="dd/mm/aaaa"
                                    />
                                </FloatingLabel>
                            </Col>

                            <Col xs={12}>
                                <FloatingLabel controlId="txtDataEntrega" label="Data entrega" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        name="data_entrega"
                                        value={objeto.data_entrega}
                                        onChange={handleChange}
                                        placeholder="dd/mm/aaaa"
                                    />
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
