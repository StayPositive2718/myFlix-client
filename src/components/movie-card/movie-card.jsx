import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// import { MovieView } from '../movie-view/movie-view.jsx';

import './movie-card.scss';

export class MovieCard extends React.Component {

  render() {
    const { movie } = this.props;
    return (
      <Card>
        <Card.Img variant="top" src={movie.ImagePath + "?not-from-cache-please"} crossOrigin="Anonymous" />
        <Card.Body className="movie-card">
          {/* <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text> */}
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link">Open</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
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

