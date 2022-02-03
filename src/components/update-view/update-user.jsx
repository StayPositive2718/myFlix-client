import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';

export function UpdateUser(props) {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newBirthday, setNewBirthday] = useState('');
  const [newUsernameErr, setNewUsernameErr] = useState('');
  const [newPasswordErr, setNewPasswordErr] = useState('');
  const [newEmailErr, setNewEmailErr] = useState('');

  const validate = () => {
    let isReq = true;
    if (username.length < 5) {
      setNewUsernameErr('Username must be 5 characters long');
      isReq = false;
    }
    if (username.length < 5) {
      setNewPasswordErr('Password must be 5 characters long');
      isReq = false;
    }
    if (username.length > 0 && !username.includes('@')) {
      setNewEmailErr('Email not formatted correctly');
      isReq = false;
    }
    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const isReq = validate();
    if (isReq) {
      axios.put(`https://matt-howell-myflix.herokuapp.com/users/${user}`, {
        username: newUsername,
        password: newPassword,
        Email: newEmail,
        Birthday: newBirthday
      },
        {
          headers: { Authorization: `Bearer ${token}` }
        }).then(response => {
          const data = response.data;
          console.log(data);
          alert('Update succesful');
        }).catch(e => {
          console.error(response).
            alert('update unsuccesful');
        });
    }
  };

  return (
    <Container>
      <Row className="main-view justify-content-md-center">
        <Col></Col>
        <Col>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label className="form-element" >New Username:</Form.Label>
              <Form.Control type="text" placeholder="Username must be 5 characters long" value={newUsername} onChange={e => setNewUsername(e.target.value)} />
              {newUsernameErr && <p>{newUsernameErr}</p>}
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label className="form-element" >New Password:</Form.Label>
              <Form.Control type="password" placeholder="Password must be 5 characters long" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
              {newPasswordErr && <p>{newPasswordErr}</p>}
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label className="form-element">New Email:</Form.Label>
              <Form.Control type="email" placeholder="Email" value={newEmail} onChange={e => setNewEmail(e.target.value)} />
              {newEmailErr && <p>{newEmailErr}</p>}
            </Form.Group>
            <Form.Group controlId="formBirthday">
              <Form.Label className="form-element" >Birthday:</Form.Label>
              <Form.Control type="birthday" onChange={e => setNewBirthday(e.target.value)} />
            </Form.Group>
          </Form>
          <Button className="form-element register-button" variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}