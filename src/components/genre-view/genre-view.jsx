import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col } from 'react-bootstrap';

import { MovieCard } from '../movie-card/movie-card.jsx'

import './genre-view.scss';

export function GenreView(props) {
  const { genre, onBackClick, movies } = props;

  const moviesByGenre = () => {
    const movieObjList = movies.filter(movie => movie.Genre.Name === genre.Name);

    return movieObjList.map(m => (
      <Col md={3} key={m._id}>
        <MovieCard movie={m} />
      </Col>
    ))
  }

  return (
    <div className="genre-view">
      <div>
        <span>Name: </span>
        <span>{genre.Name}</span>
      </div>
      <div>
        <span>About: </span>
        <span>{genre.Description}</span>
      </div>
      <div>
        <span>Other {genre.Name} movies in this collection</span>
        {moviesByGenre()}
      </div>
      <div>
        <Button onClick={() => onBackClick()}>Back</Button>
      </div>
    </div>
  );
}

GenreView.proptypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};