import React, { useState, useEffect } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import axios from 'axios';
// import { Link } from 'react-router-dom';

import UserInfo from './user-info.jsx'
import FavoriteMovies from './favorite-movies.jsx'
import UpdateUser from './update-user.jsx'


export function ProfileView(props) {
  const [userProfile, setUserProfile] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const getUser = (e) => {
    const token = localStorage.getItem('token');
    axios.get(`https://matt-howell-myflix.herokuapp.com/users/${props.user}`, {
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
      },
        {
          headers: { Authorization: `Bearer ${token}` }
        }).then(response => {
          setUserProfile(response.data);
          alert('Update succesful');
        }).catch(e => {
          console.error(response).
            alert('update unsuccesful');
        });
    }
  };

  const handleUpdate = (e) => {
    console.log(e);
  }

  useEffect(() => {
    getUser();
  }, [])

  return (
    <>
      {/* display user info */}
      <UserInfo username={userProfile.username} email={userProfile.Email} />
      {/* List of favorite movies */}
      <FavoriteMovies movieList={favoriteMovies} removeFromFavorites={removeFromFavorites} />
      {/* Update user information */}
      <UpdateUser user={userProfile} handleSubmit={handleSubmit} handleUpdate={handleUpdate} />
    </>
  )
}

