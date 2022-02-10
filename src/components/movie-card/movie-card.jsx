import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Figure, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// import { MovieView } from '../movie-view/movie-view.jsx';

import './movie-card.scss';

export function MovieCard({ movies, addToFavorites }) {
  return (
    <Card className="custom-class">
      <Card.Body>
        <Row className="justify-content-center">
          {movies.map((movie) => {
            return (
              <Col xs={12} md={3} key={movie._id} className="fav-movies">
                <Figure>
                  <Link to={`/movies/${movie._id}`}>
                    <Figure.Image src={movie.ImagePath + "?not-from-cache-please"} crossOrigin="Anonymous" alt={movie.Title} />
                  </Link>
                </Figure>
                <Button onClick={() => addToFavorites(movie._id)} variant="link">Add to Favorites</Button>
              </Col>
            )
          })
          }
        </Row>
      </Card.Body>
    </Card>
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

