import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

import './navigation-view.scss'

export function NavigationView(props) {

  return (
    <Navbar fluid expand="sm" sticky="top" variant="dark" className="color-nav">
      <Container fluid className="container">
        <Navbar.Brand>MyFlix</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/users">Profile</Nav.Link>
            <Nav.Item id="link-item">
              <Button id="link-button" variant="link" onClick={() => props.onLoggedOut()}>Logout</Button>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

