import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col, Card } from 'react-bootstrap';

import { MovieCard } from '../movie-card/movie-card.jsx'

import './director-view.scss';

export function DirectorView({ director, onBackClick, movies }) {

  const moviesByDirector = movies.filter(movie => movie.Director.Name === director.Name);

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
      <Row className="justify-content-center">
        <Col>
          <Card className="custom-class">
            <Card.Title>Movies in this collection by {director.Name}</Card.Title>
            <Card.Body>
              {moviesByDirector.map(m => (
                <Col md={3} key={m._id}>
                  <MovieCard movie={m} />
                </Col>
              ))};
            </Card.Body>
          </Card>
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