import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Card, Container } from 'react-bootstrap'
import axios from 'axios';

import UserInfo from './user-info.jsx'
import FavoriteMovies from './favorite-movies.jsx'
import { UpdateUser } from '../update-user/update-user.jsx';

import './profile-view.scss'

export function ProfileView({ movies }) {
  const [userProfile, setUserProfile] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  //returns all data for current user
  const getUser = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    axios.get(`https://matt-howell-myflix.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => {
      setUserProfile(response.data);
      const favoriteMovieList = movies.filter(movie => response.data.Favorite_Movies.includes(movie._id));
      setFavoriteMovies(favoriteMovieList)
    }).catch(function (error) {
      console.log(error);
    });
  }

  // compares list of favorite movie id's and makes a list of all movie objects with those id's
  const removeFromFavorites = (movieId) => {
    let token = localStorage.getItem('token');
    let username = localStorage.getItem('user');
    axios.delete(`https://matt-howell-myflix.herokuapp.com/users/${username}/movies/${movieId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    ).then(response => {
      const favoriteMovieList = movies.filter(movie => response.data.Favorite_Movies.includes(movie._id));
      setFavoriteMovies(favoriteMovieList);
    }).catch(e => {
      console.error(e)
    });
  }

  // deletes user from database
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
    window.scrollTo(0, 0);
    getUser();
  }, [])

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} sm={4} md={4} lg={4}>
          <Card className="custom-class" >
            <Card.Title>Your information</Card.Title>
            <Card.Body>
              <UserInfo username={userProfile.username} email={userProfile.Email} />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={4} md={4} lg={4}>
          <UpdateUser userProfile={userProfile} getUser={getUser} />
        </Col>
        <Col xs={12} sm={4} md={4} lg={4}>
          <Container className="update-user">
            <Button onClick={() => deleteUser()}>Delete User Account</Button>
          </Container>
        </Col>
      </Row>
      <Row>
        <Col>
          <FavoriteMovies movieList={favoriteMovies} removeFromFavorites={removeFromFavorites} />
        </Col>
      </Row>
    </Container >
  )
}

