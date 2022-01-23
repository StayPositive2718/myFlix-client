import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Container } from 'react-bootstrap';

import './movie-card.scss';

export class MovieCard extends React.Component {

  render() {
    const { movie, onMovieClick } = this.props;
    return (
      <Container>
        <Card className="card-element">
          <Card.Img variant="top" src={movie.ImagePath + "?not-from-cache-please"} crossOrigin="Anonymous" />
          <Card.Body className="movie-card">
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Description}</Card.Text>
            <Button onClick={() => onMovieClick(movie)} variant="primary" type="submit">Open</Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};
