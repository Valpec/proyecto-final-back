import CartWidget from '../CartWidget/CartWidget';
 import Container from 'react-bootstrap/Container';
 import Nav from 'react-bootstrap/Nav';
 import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Navbar.css';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <Navbar expand="lg" className=" " sticky='top'>
        <Container fluid className='contenidoNavbar'>
            <Navbar.Brand as={NavLink}to ={'/'}  >
                <img src={require("../assets/logo-cattalina.png")} alt="Logo Cattalina" width={150} />
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
               <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                    <Nav.Link as={NavLink} to ={'/'} className={({isActive}) => isActive ? 'ActiveOption' : 'Option'} >INICIO</Nav.Link>
                    <NavDropdown title="PRODUCTOS" id="basic-nav-dropdown" >
                        <NavDropdown.Item as={NavLink}to ={'/categoria/Velas'} className={({isActive}) => isActive ? 'ActiveOption' : 'Option'} >Velas</NavDropdown.Item>
                        <NavDropdown.Item as={NavLink}to ={'/categoria/Esencia'} className={({isActive}) => isActive ? 'ActiveOption' : 'Option'}>Esencias</NavDropdown.Item>
                        <NavDropdown.Item as={NavLink}to ={'/categoria/Textil'} className={({isActive}) => isActive ? 'ActiveOption' : 'Option'}>Textiles</NavDropdown.Item>
                        <NavDropdown.Item as={NavLink}to ={'/categoria/Decoracion'} className={({isActive}) => isActive ? 'ActiveOption' : 'Option'}>Decoraciones</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link  as={NavLink}to ={'/'} className={({isActive}) => isActive ? 'ActiveOption' : 'Option'} >NOSOTROS</Nav.Link>
                    <Nav.Link  as={NavLink}to ={'/'} className={({isActive}) => isActive ? 'ActiveOption' : 'Option'} >FAQs</Nav.Link>
                       <Nav.Link  as={NavLink}to ={'/'}className={({isActive}) => isActive ? 'ActiveOption' : 'Option'}  >CONTACTO</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            <NavLink to='/cart '> <CartWidget /></NavLink>
            

        </Container>
    </Navbar>
    );
}

export default NavBar;
