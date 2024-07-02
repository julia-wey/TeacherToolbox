import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Navigation() {
    return (
        <Navbar>
            <Container>
                <Navbar.Brand>Teacher Toolbox</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto pt-2">
                    <Nav.Link>About</Nav.Link>
                    <Nav.Link>Teachers</Nav.Link>
                    <Nav.Link>Strategies</Nav.Link>
                    <Nav.Link>Profile</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;