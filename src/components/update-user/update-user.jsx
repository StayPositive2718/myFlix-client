import axios from 'axios';
import React, { useState } from 'react';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';


export function UpdateUser({ userProfile, getUser }) {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newUsernameErr, setNewUsernameErr] = useState('');
  const [newPasswordErr, setNewPasswordErr] = useState('');
  const [newEmailErr, setNewEmailErr] = useState('');

  // client side validation
  const validate = () => {
    let isReq = true;
    if (newUsername.length < 5 && newUsername.length > 0) {
      setNewUsernameErr('Username must be 5 characters long');
      isReq = false;
    }
    if ((!newEmail.includes('@')) && newEmail.length > 0) {
      setNewEmailErr('Email not formatted correctly');
      isReq = false;
    }
    if (newPassword.length < 5 && newPassword.length > 0) {
      setNewPasswordErr('Password must be 5 characters long');
      isReq = false;
    }
    return isReq;
  }

  // takes input from form and updates user clientInformation.  Split password from username and email to preserve hashing of password.
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const isReq = validate();
    if (isReq) {
      if (newPassword !== '') {
        axios.put(`https://matt-howell-myflix.herokuapp.com/users/${user}/updatepassword`,
          {
            password: newPassword
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          }).catch(e => {
            console.error(e).
              alert('update unsuccesful');
          });
      }
      axios.put(`https://matt-howell-myflix.herokuapp.com/users/${user}/update`,
        {
          username: newUsername,
          Email: newEmail
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }).then(response => {
          localStorage.setItem('user', response.data.username);
          getUser();
          alert('Update succesful');
        }).catch(e => {
          console.error(e).
            alert('update unsuccesful');
        });
    }
  };

  // takes input from form and sets user information.  If username or password are not entered, current information is substituted.  If password is not entered, password is set to ''
  const onUpdate = (e) => {
    if (e.target.name === 'username') {
      console.log(e.target.value)
      setNewUsername(e.target.value)
    } else {
      setNewUsername(userProfile.username)
    }
    if (e.target.name === 'email') {
      setNewEmail(e.target.value)
    } else {
      setNewEmail(userProfile.Email)
    }
    if (e.target.name === 'password') {
      setNewPassword(e.target.value)
    } else {
      setNewPassword('')
    }
  }

  return (
    <Row>
      <Col>
        <Card className="custom-class">
          <Card.Title>Update your info</Card.Title>
          <Card.Body>
            <Form>
              <Form.Group>
                <Form.Label>Update Username</Form.Label>
                <Form.Control
                  type='text'
                  placeholder={'New Username'}
                  name='username'
                  onChange={e => onUpdate(e)} />
                {newUsernameErr && <p>{newUsernameErr}</p>}
              </Form.Group>

              <Form.Group>
                <Form.Label>Update Password</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='**********'
                  name='password'
                  onChange={e => onUpdate(e)} />
                {newPasswordErr && <p>{newPasswordErr}</p>}
              </Form.Group>

              <Form.Group>
                <Form.Label>Update Email</Form.Label>
                <Form.Control
                  type='text'
                  placeholder={'New Email'}
                  name='email'
                  onChange={e => onUpdate(e)} />
                {newEmailErr && <p>{newEmailErr}</p>}
              </Form.Group>
            </Form>
            <Button variant='primary' type='submit' onClick={handleSubmit}>Update</Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}
