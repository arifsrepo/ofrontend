import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { MyContext } from '../../Context/AuthContext';

const SiteNavBar = () => {
    const data = useContext(MyContext);
    const logout = data.logut;

    return (
        <div>
          <Navbar collapseOnSelect expand="lg" variant="light" bg="light">
            <Container>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link as={NavLink} to="/"> Home </Nav.Link>
                  <Nav.Link as={NavLink} to="/noteone"> ক্যাম্পাসের ডায়েরি </Nav.Link>
                  <Nav.Link as={NavLink} to="/notetwo"> শেষের শুরু </Nav.Link>
                  <Nav.Link as={NavLink} to="/AdminControl"> Admin Control </Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link onClick={logout}>Log Out</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
    );
};

export default SiteNavBar;