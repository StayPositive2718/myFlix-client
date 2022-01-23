import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Row, Col, Container, Navbar, Nav } from 'react-bootstrap';

import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    // Send a request to the server for authentication then call props.LoggedIn(username) 
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

      <Container fluid className="login-view">
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
            </Form>
            <Button className="form-element register-button" variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
            <Button variant="primary" type="submit" className="form-element" onClick={handleSubmit}>Not Registered? Click Here</Button>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired
};