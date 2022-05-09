import React from 'react';
import PropTypes from 'prop-types';
import { Button, Figure } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './movie-card.scss';

export function MovieCard({ movie }) {
  //pushes selected movie to favorites list
  const addToFavorites = (movieId) => {
    let token = localStorage.getItem('token');
    let username = localStorage.getItem('user');

    axios.post(`https://matt-howell-myflix.herokuapp.com/users/${username}/movies/${movieId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    ).then(alert('Added to Favorites!')).catch(e => {
      console.error(e)
    });
  }

  return (<div className="movies">
    <Figure>
      <Link to={`/movies/${movie._id}`}>
        <Figure.Image src={movie.ImagePath + "?not-from-cache-please"} crossOrigin="Anonymous" alt={movie.Title} />
      </Link>
      <Button onClick={() => addToFavorites(movie._id)} variant="link">Add to Favorites</Button>
    </Figure>

  </div>
  );
}

MovieCard.proptypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birthyear: PropTypes.string.isRequired
    }),
    ImagePath: PropTypes.string.isRequired
  }).isRequired
};

