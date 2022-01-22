import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';

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
            <Button className="form-element" variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
            <Button variant="primary" type="submit" className="form-element register-button" onClick="">Not Registered? Click Here</Button>
          </Form>
        </Col>
        <Col></Col>
      </Row>
    </Container>
    // <form>
    //   <label>
    //     Username:
    //     <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
    //   </label>
    //   <label>
    //     Password:
    //     <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
    //   </label>
    //   <button type="submit" onClick={handleSubmit}>Submit</button>
    //   <label>
    //     Not Registered?
    //   </label>
    //   <button type="button">Click Here</button>
    // </form>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired
};