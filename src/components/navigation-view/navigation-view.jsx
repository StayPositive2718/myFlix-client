import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

import './navigation-view.scss'

export function NavigationView({ onLoggedOut }) {

  return (
    <Navbar fluid expand="sm" sticky="top" variant="dark" className="color-nav">
      <Container fluid className="container">
        <Navbar.Brand>MyFlix</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/users">Profile</Nav.Link>
            <Nav.Link href="" onClick={onLoggedOut}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

