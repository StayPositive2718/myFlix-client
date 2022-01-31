import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Form, Button, Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //Declare hook for each input
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

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
    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      // Send a request to the server for authentication then call props.LoggedIn(username) 
      axios.post('https://matt-howell-myflix.herokuapp.com/login', {
        username: username,
        password: password
      }).then(response => {
        const data = response.data;
        // console.log(data)
        props.onLoggedIn(data);
      }).catch(e => {
        console.error('no such user')
      });
    }
  };


  return (
    <Container fluid className="login-view">
      <Row>
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label className="form-element" >Username:</Form.Label>
            <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
            {usernameErr && <p>{usernameErr}</p>}
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label className="form-element" >Password:</Form.Label>
            <Form.Control type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
            {passwordErr && <p>{passwordErr}</p>}
          </Form.Group>
        </Form>
        <Button className="form-element submit-button" variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
        <Link to={`/register`}>
          <Button variant="link">Register</Button>
        </Link>
      </Row>
    </Container>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};