import React, { useContext } from 'react';
import { AppContext } from '../context/Context'; 
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';


function NavBar() {
    const navigate = useNavigate();
    const useAppContext = () => useContext(AppContext);
    const { user, setUser } = useAppContext();

    function handleLogInClick() {
        navigate('/login')
    }
    
    function handleLogoutClick() {
        fetch('/logout', {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            }).then((resp) => {
                if (resp.ok) {
                setUser(null);
                navigate('/');
                }
            });
    }

    // function handleAboutClick() {
    //     navigate('/#about')
    // }
            
    
    return (
        <Navbar expand="lg" className="navbar" fixed="top">
            <Container>
                <Navbar.Brand href='/' className="nav-brand">Teacher Toolbox</Navbar.Brand>
                    {/* <img
                        src=
                        width="30"
                        height="30"
                        alt="logo"
                    /> */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto pt-2">
                    <Nav.Link className="nav-link" href="/teachers">Teacher Page</Nav.Link>
                    <Nav.Link className="nav-link" href="/strategies">Strategies</Nav.Link>
                    {/* <Nav.Link className="nav-link" href="/signup">Sign Up</Nav.Link>
                    <Nav.Link className="nav-link" href="/login">Login</Nav.Link> */}
                    {user === null || user === undefined ? <Nav.Link className="nav-link" href="/signup">Signup</Nav.Link>: ""}
                </Nav>
                    {user === null || user === undefined ? 
                    <Button className="navbar-login-btn" 
                        onClick={handleLogInClick}>Login
                     </Button> : <Button className="navbar-login-btn" 
                        onClick={handleLogoutClick}>Logout</Button>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;