import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Card, Row } from 'react-bootstrap';

import { MovieCard } from '../movie-card/movie-card.jsx'

import './genre-view.scss';

export function GenreView(props) {
  const { genre, onBackClick, movies } = props;

  // array of all movies in this genre
  const moviesByGenre = movies.filter(movie => movie.Genre.Name === genre.Name);

  // scrolls to top of page when opening
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <>
      <Row>
        <Col>
          <Button onClick={() => onBackClick()}>Back</Button>
        </Col>
        <Col>
          <Card className="custom-class" >
            <Card.Title>Genre: {genre.Name}</Card.Title>
            <Card.Body>
              <p>About: {genre.Description}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col></Col>
      </Row>

      <Row className="movies-header">
        <Col xs={12}>
          <h1>{genre.Name} movies in this collection</h1>
        </Col>
        <Col>
          <Row className="justify-content-center">
            {moviesByGenre.map(m => (
              <Col Col xs={12} md={6} lg={3} key={m._id} className="all-movies">
                <MovieCard movie={m} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </>
  );
}

GenreView.proptypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};