import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
// import { Link } from 'react-router-dom';

import UserInfo from './user-info.jsx';
import FavoriteMovies from './favorite-movies.jsx';


export function ProfileView(props) {
  const [userProfile, setUserProfile] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  function getUser() {
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

  useEffect(() => {
    getUser();
  }, [])


  return (
    <>
      <Row>
        {/* display user info */}
        <div>
          <UserInfo username={userProfile.username} email={userProfile.Email} birthday={userProfile.Birthday} />

          {/* <Link to={"/users/update"}>
            <Button variant="link">Update User Information</Button>
          </Link> */}
        </div>
      </Row>
      <Row>
        {/* List of favorite movies */}
        <FavoriteMovies movieList={favoriteMovies} />

      </Row>
    </>
  )
}

