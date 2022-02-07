import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import axios from 'axios';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

import './registration-view.scss';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');

  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username Required');
      isReq = false;
    } else if (username.length < 5) {
      setUsernameErr('Username must be 5 characters long');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password Required');
      isReq = false;
    } else if (password.length < 5) {
      setPasswordErr('Password must be 5 characters long');
      isReq = false;
    }
    if (!email) {
      setEmailErr('Email Required');
      isReq = false;
    } else if (!email.includes('@')) {
      setEmailErr('Email not formatted correctly');
      isReq = false;
    }
    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios.post('https://matt-howell-myflix.herokuapp.com/users', {
        username: username,
        password: password,
        Email: email,
        Birthday: birthday
      }).then(response => {
        const data = response.data;
        alert('Registration succesful, please login!');
        window.open('/', '_self');
      }).catch(e => {
        console.error(response).
          alert('registration unsuccesful');
      });
    }
  };

  return (
    <Container className="register-view">
      <Row>
        <Col></Col>
        <Col>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label className="form-element" >Username:</Form.Label>
              <Form.Control type="text" placeholder="Username must be 5 characters long" value={username} onChange={e => setUsername(e.target.value)} />
              {usernameErr && <p>{usernameErr}</p>}
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label className="form-element" >Password:</Form.Label>
              <Form.Control type="password" placeholder="Password must be 5 characters long" value={password} onChange={e => setPassword(e.target.value)} />
              {passwordErr && <p>{passwordErr}</p>}
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label className="form-element" >Email:</Form.Label>
              <Form.Control type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
              {emailErr && <p>{emailErr}</p>}
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
  );
}
