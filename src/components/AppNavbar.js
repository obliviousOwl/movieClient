import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useContext } from 'react';
import UserContext from '../UserContext';
import { Link, NavLink } from 'react-router-dom';
import './AppNavbar.css';

export default function AppNavbar() {
    const { user } = useContext(UserContext);

    return (
        <Navbar bg="primary" expand="lg">
            <Container fluid>
                <Navbar.Brand as={Link} to="/">Movie Vault</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <NavLink exact to="/" className="custom-nav-link">Home</NavLink>
						<NavLink to="/movies" className="custom-nav-link">Movies</NavLink>
                        {!user.id ? (
                            <>
                                <NavLink to="/login" className="custom-nav-link">Login</NavLink>
                                <NavLink to="/register" className="custom-nav-link">Register</NavLink>
                            </>
                        ) : (
                            <>
                                
                                <NavLink to="/addMovie" className="custom-nav-link">Add Movie</NavLink>
                                <NavLink to="/logout" className="custom-nav-link">Logout</NavLink>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
