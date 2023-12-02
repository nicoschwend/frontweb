import { NavLink } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import LogoutButton from '../Profile/Logout';
import Popup from 'reactjs-popup';

function NavBar() {
    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary black">
                <Container>
                    <Navbar.Brand href="/"></Navbar.Brand>
                    <Navbar.Brand href="/">Grupo 100</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="/LandingPage/Reminder">Reminder</Nav.Link>
                            <Nav.Link href="/LandingPage/Notification">Notificacion</Nav.Link>
                            <Nav.Link href="/principal">Calendario</Nav.Link>
                            <Nav.Link href="/instrucciones">Instrucciones</Nav.Link>
                            <Nav.Link href="/signin">Sign In</Nav.Link>
                            <Nav.Link href="/signup">Sign Up</Nav.Link>
                            <LogoutButton/>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default NavBar

