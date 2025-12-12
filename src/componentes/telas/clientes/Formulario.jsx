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
import CampoEntrada from '../../comuns/CampoEntrada';

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

                            {/* Código (somente leitura) */}
                            <Col xs={12} md={6}>
                                <FloatingLabel controlId="txtCodigo" label="Código" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        readOnly
                                        name="clienteId"
                                        value={objeto.clienteId}
                                        onChange={handleChange}
                                    />
                                </FloatingLabel>
                            </Col>

                            {/* Nome */}
                            <Col xs={12} md={6}>
                                <CampoEntrada
                                    value={objeto.nome}
                                    id="txtNome"
                                    name="nome"
                                    label="Nome"
                                    tipo="text"
                                    onchange={handleChange}
                                    msgvalido="OK certo"
                                    msginvalido="Informe o nome"
                                    requerido={true}
                                    readonly={false}
                                    maxCaracteres={40}
                                />
                            </Col>

                            {/* Telefone */}
                            <Col xs={12} md={6}>
                                <CampoEntrada
                                    value={objeto.telefone}
                                    id="txtTelefone"
                                    name="telefone"
                                    label="Telefone"
                                    tipo="text"
                                    onchange={handleChange}
                                    msgvalido="OK"
                                    msginvalido="Informe o telefone"
                                    requerido={false}
                                    readonly={false}
                                    maxCaracteres={11}
                                />
                            </Col>

                            {/* CPF */}
                            <Col xs={12} md={6}>
                                <CampoEntrada
                                    value={objeto.cpf}
                                    id="txtCPF"
                                    name="cpf"
                                    label="CPF"
                                    tipo="text"
                                    onchange={handleChange}
                                    msgvalido="OK"
                                    msginvalido="Informe o CPF"
                                    requerido={true}
                                    readonly={false}
                                    maxCaracteres={11}
                                />
                            </Col>

                            {/* Endereço */}
                            <Col xs={12}>
                                <CampoEntrada
                                    value={objeto.endereco}
                                    id="txtEndereco"
                                    name="endereco"
                                    label="Endereço"
                                    tipo="text"
                                    onchange={handleChange}
                                    msgvalido="OK"
                                    msginvalido="Informe o endereço"
                                    requerido={false}
                                    readonly={false}
                                    maxCaracteres={100}
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
