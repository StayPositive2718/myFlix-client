import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col } from 'react-bootstrap';

import { MovieCard } from '../movie-card/movie-card.jsx'

import './director-view.scss';

export function DirectorView({ director, onBackClick, movies }) {

  const moviesByDirector = () => {
    const movieObjList = movies.filter(movie => movie.Director.Name === director.Name);

    return movieObjList.map(m => (
      <Col md={3} key={m._id}>
        <MovieCard movie={m} />
      </Col>
    ))
  }

  return (
    <div className="director-view">
      <div>
        <span>Name:</span>
        <span>{director.Name}</span>
      </div>
      <div>
        <span>About:</span>
        <span>{director.Bio}</span>
      </div>
      <div>
        <span>Born:</span>
        <span>{director.Birth}</span>
      </div>
      <div>
        <span>Movies in this collection by {director.Name}:</span>
        <span>{moviesByDirector()}</span>
      </div>
      <div>
        <Button onClick={() => onBackClick()}>Back</Button>
      </div>
    </div>
  );
}



DirectorView.proptypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};