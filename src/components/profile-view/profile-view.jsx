import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Card, Container, Form } from 'react-bootstrap'
import axios from 'axios';
// import { Link } from 'react-router-dom';

import UserInfo from './user-info.jsx'
import FavoriteMovies from './favorite-movies.jsx'

import './profile-view.scss'

export function ProfileView(props) {
  const [userProfile, setUserProfile] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [params, setParams] = useState([])

  const getUser = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    console.log(user);
    axios.get(`https://matt-howell-myflix.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => {
      const favoriteMovieList = props.movies.filter(movie => response.data.Favorite_Movies.includes(movie._id));
      setUserProfile(response.data);
      setFavoriteMovies(favoriteMovieList)
    }).catch(function (error) {
      console.log(error);
    });
  }

  const removeFromFavorites = (movieId) => {
    let token = localStorage.getItem('token');
    let username = localStorage.getItem('user');
    axios.delete(`https://matt-howell-myflix.herokuapp.com/users/${username}/movies/${movieId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    ).then(response => {
      const favoriteMovieList = props.movies.filter(movie => response.data.Favorite_Movies.includes(movie._id));
      setFavoriteMovies(favoriteMovieList)
    }).catch(e => {
      console.error(e)
    });
  }

  const validate = () => {
    let isReq = true;
    if (!newUsername) {
      setNewUsername(userProfile.username);
    } else if (newUsername.length < 5) {
      setUsernameErr('Username must be 5 characters long');
      isReq = false;
    }
    if (!newEmail) {
      setNewEmail(userProfile.Email)
    } else if (!newEmail.includes('@')) {
      setEmailErr('Email not formatted correctly');
      isReq = false;
    }
    setParams({
      username: newUsername,
      password: newPassword,
      Email: newEmail
    })
    if (!newPassword) {
      setParams({
        username: newUsername,
        Email: newEmail
      });
    } else if (newPassword.length < 5) {
      setPasswordErr('Password must be 5 characters long');
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
      axios.put(`https://matt-howell-myflix.herokuapp.com/users/${user}`,
        params,
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

  const deleteUser = () => {
    const confirm = window.confirm('Are you dure you want to delete your account?');
    if (confirm) {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      axios.delete(`https://matt-howell-myflix.herokuapp.com/users/${user}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }).then(response => {
          alert(response.data);
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          window.open('/', '_self');
        }).catch(function (error) {
          console.log(error);
        });
    }
  }

  useEffect(() => {
    getUser();
    window.scrollTo(0, 0);
  }, [])

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} sm={4}>
          <Card className="custom-class" >
            <Card.Title>Your information</Card.Title>
            <Card.Body>
              <UserInfo username={userProfile.username} email={userProfile.Email} />
            </Card.Body>
          </Card>

        </Col>
        <Col xs={12} sm={4} md={4} className="justify-content-md-center">
          <Card className="custom-class">
            <Card.Title>Update your info</Card.Title>
            <Card.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Update Username</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder={userProfile.username}
                    value={newUsername}
                    onChange={e => setNewUsername(e.target.value)} />
                  {usernameErr && <p>{usernameErr}</p>}
                </Form.Group>

                <Form.Group>
                  <Form.Label>Update Password</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='**********'
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)} />
                  {passwordErr && <p>{passwordErr}</p>}
                </Form.Group>

                <Form.Group>
                  <Form.Label>Update Email</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder={userProfile.Email}
                    value={newEmail}
                    onChange={e => setNewEmail(e.target.value)} />
                  {emailErr && <p>{emailErr}</p>}
                </Form.Group>

              </Form>

              <Button variant='primary' type='submit' onClick={handleSubmit}>Update</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={4} md={4}>
          <Container className="delete-user">
            <Button onClick={() => deleteUser()}>Delete User Account</Button>
          </Container>
        </Col>

      </Row>

      {/* display user info */}

      {/* List of favorite movies */}
      <Row>
        <Col>
          <FavoriteMovies movieList={favoriteMovies} removeFromFavorites={removeFromFavorites} />
        </Col>
      </Row>
      {/* Update user information */}



    </Container >
  )
}

