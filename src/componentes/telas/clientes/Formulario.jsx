import { useContext } from 'react'
import Alerta from '../../comuns/Alerta';
import ClienteContext from './ClientesContext';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function Formulario() {

    const { objeto, handleChange, acaoCadastrar, alerta, exibirForm, setExibirForm } = useContext(ClienteContext);

    return (
        <Modal show={exibirForm} onHide={() => setExibirForm(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Cliente</Modal.Title>
            </Modal.Header>
            <form id="formulario" onSubmit={acaoCadastrar}>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Alerta alerta={alerta} />

                            <Col xs={12} md={6}>
                                <FloatingLabel controlId="txtCodigo" label="Código" className="mb-3">
                                    <Form.Control type="text" readOnly name="clienteId"
                                        value={objeto.clienteId}
                                        onChange={handleChange} />
                                </FloatingLabel>
                            </Col>

                            <Col xs={12} md={6}>
                                <FloatingLabel controlId="txtNome" label="Nome" className="mb-3">
                                    <Form.Control type="text" required name="nome"
                                        value={objeto.nome}
                                        onChange={handleChange} placeholder="Informe o nome" />
                                </FloatingLabel>
                            </Col>

                            <Col xs={12} md={6}>
                                <FloatingLabel controlId="txtTelefone" label="Telefone" className="mb-3">
                                    <Form.Control type="text" name="telefone"
                                        value={objeto.telefone}
                                        onChange={handleChange} placeholder="00000000000" />
                                </FloatingLabel>
                            </Col>

                            <Col xs={12} md={6}>
                                <FloatingLabel controlId="txtCPF" label="CPF" className="mb-3">
                                    <Form.Control type="text" required name="cpf"
                                        value={objeto.cpf}
                                        onChange={handleChange} placeholder="00000000000" />
                                </FloatingLabel>
                            </Col>

                            <Col xs={12}>
                                <FloatingLabel controlId="txtEndereco" label="Endereço" className="mb-3">
                                    <Form.Control type="text" name="endereco"
                                        value={objeto.endereco}
                                        onChange={handleChange} placeholder="Informe o endereço" />
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
