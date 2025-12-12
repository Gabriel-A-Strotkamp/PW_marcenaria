import { useContext } from 'react'
import Alerta from '../../comuns/Alerta';
import MaterialContext from './MaterialContext';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CampoEntrada from '../../comuns/CampoEntrada';

function Formulario() {

    const { objeto, handleChange, acaoCadastrar, alerta, exibirForm, setExibirForm } =
        useContext(MaterialContext);

    return (
        <Modal show={exibirForm} onHide={() => setExibirForm(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Material</Modal.Title>
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
                                    name="materialId"
                                    value={objeto.materialId}
                                    onchange={handleChange}
                                    readonly={true}
                                    requerido={false}
                                    msgvalido="OK"
                                    msginvalido=""
                                    maxCaracteres={10}
                                />
                            </Col>

                            {/* Nome */}
                            <Col xs={12} md={8}>
                                <CampoEntrada
                                    id="txtNome"
                                    label="Nome"
                                    tipo="text"
                                    name="nome"
                                    value={objeto.nome}
                                    onchange={handleChange}
                                    requerido={true}
                                    readonly={false}
                                    msgvalido="OK"
                                    msginvalido="Informe o nome do material"
                                    maxCaracteres={100}
                                />
                            </Col>

                            {/* Quantidade */}
                            <Col xs={12} md={6}>
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

                            {/* Valor */}
                            <Col xs={12} md={6}>
                                <CampoEntrada
                                    id="txtValor"
                                    label="Valor"
                                    tipo="number"
                                    name="valor"
                                    value={objeto.valor}
                                    onchange={handleChange}
                                    requerido={true}
                                    readonly={false}
                                    msgvalido="OK"
                                    msginvalido="Informe o valor"
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
