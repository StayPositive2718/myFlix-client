import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button, Navbar, Nav } from 'react-bootstrap';

import './registration-view.scss';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    // Send a request to the server for authentication then call props.onLoggedIn(username) 
    props.onLoggedIn(username);
  };

  return (
    <>
      <Navbar className="nav" expand="lg" sticky="top" bg="#221F1F" variant="dark">
        <Container>
          <Navbar.Brand href="#home">MyFlix</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="">Login</Nav.Link>
              <Nav.Link href="">Register</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid className="register-view">
        <Row>
          <Col></Col>
          <Col>
            <Form>
              <Form.Group controlId="formUsername">
                <Form.Label className="form-element" >Username:</Form.Label>
                <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label className="form-element" >Password:</Form.Label>
                <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label className="form-element" >Email:</Form.Label>
                <Form.Control type="email" onChange={e => setEmail(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="formBirthday">
                <Form.Label className="form-element" >Birthday:</Form.Label>
                <Form.Control type="birthday" onChange={e => setBirthday(e.target.value)} />
              </Form.Group>
            </Form>
            <Button className="form-element register-button" variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
}

RegistrationView.proptypes = {
  onLoggedin: PropTypes.string.isRequired
}