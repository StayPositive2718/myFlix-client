import React from 'react';
import { Row, Col, Navbar, Container, Nav, NavItem, Button } from 'react-bootstrap';
export function NavigationView(props) {

  return (

    <Navbar className="nav" expand="lg" sticky="top" bg="#221F1F" variant="dark">
      <Container fluid className="container">
        <Navbar.Brand>MyFlix</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link href="/">Login</Nav.Link>
            <Button variant="link" onClick={() => props.onLoggedOut()}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  )
}

