import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, Outlet } from 'react-router-dom';

function Menu({ usuario }) {
    // usuario = { nome: "...", cargo: "G" | "S" | "F" }

    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <NavLink className="navbar-brand" to="/">MarcenariaApp</NavLink>

                    <Navbar.Toggle aria-controls="navbar" />
                    <Navbar.Collapse id="navbar">
                        <Nav className="me-auto">

                            {/* Página Home */}
                            <NavLink className="nav-link" to="/">Home</NavLink>

                            {/* Cadastro de tabelas */}
                            <NavDropdown title="Cadastros" id="cadastros-dropdown">
                                <NavLink className="dropdown-item" to="/clientes">Clientes</NavLink>
                                <NavLink className="dropdown-item" to="/materiais">Materiais</NavLink>
                                {usuario?.cargo === "G" && (
                                    <NavLink className="dropdown-item" to="/funcionarios">Funcionários</NavLink>
                                )}
                            </NavDropdown>

                            {/* Pedidos */}
                            <NavDropdown title="Pedidos" id="pedidos-dropdown">
                                <NavLink className="dropdown-item" to="/pedidos">Pedidos</NavLink>
                                <NavLink className="dropdown-item" to="/itens">Itens do Pedido</NavLink>
                            </NavDropdown>

                            {/* Sobre */}
                            <NavLink className="nav-link" to="/sobre">Sobre</NavLink>
                        </Nav>

                        {/* Login / Logout */}
                        <Nav>
                            {!usuario ? (
                                <NavLink className="nav-link" to="/login">Login</NavLink>
                            ) : (
                                <NavLink className="nav-link text-danger" to="/logout">
                                    Logout ({usuario.nome})
                                </NavLink>
                            )}
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Outlet />
        </div>
    );
}

export default Menu;
