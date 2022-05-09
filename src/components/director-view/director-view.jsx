import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col, Card } from 'react-bootstrap';

import { MovieCard } from '../movie-card/movie-card.jsx'

export function DirectorView({ director, onBackClick, movies }) {

  // array of all movies by director
  const moviesByDirector = movies.filter(movie => movie.Director.Name === director.Name);

  // scrolls to top of page when opening
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <>
      <Row className="justify-content-center">
        <Col><Button onClick={() => onBackClick()}>Back</Button></Col>
        <Col xs={12} sm={6}>
          <Card className="custom-class" >
            <Card.Title>Director: {director.Name}</Card.Title>
            <Card.Body>
              <p>About: {director.Bio}</p>
              <p>Born: {director.Birth}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col></Col>
      </Row>
      <Row>
        <Col xs={12} className="movies-header">
          <h1>Movies in this collection by {director.Name}</h1>
        </Col>
        <Col>
          <Row className="justify-content-center">
            {moviesByDirector.map(m => (
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



DirectorView.proptypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};