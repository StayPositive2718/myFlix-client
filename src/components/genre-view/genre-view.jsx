import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Card, Row } from 'react-bootstrap';

import { MovieCard } from '../movie-card/movie-card.jsx'

import './genre-view.scss';

export function GenreView(props) {
  const { genre, onBackClick, movies } = props;

  const moviesByGenre = () => {
    const movieObjList = movies.filter(movie => movie.Genre.Name === genre.Name);

    return (
      <Row>
        <Col>
          <MovieCard movies={movieObjList} />
        </Col>
      </Row>
    )
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <>
      <Row className="justify-content-center">
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
      <Row className="justify-content-center">
        <Col>
          <Card className="custom-class">
            <Card.Title>{genre.Name} movies in this collection</Card.Title>
            <Card.Body>{moviesByGenre()}</Card.Body>
          </Card>
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