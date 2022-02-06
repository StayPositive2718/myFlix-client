import React from 'react';
import { Row, Card, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function FavoriteMovies({ movieList, removeFromFavorites }) {
  return (
    <>
      <h1>Favorite Movies</h1>
      <Row className="justify-content-md-center">
        {movieList.map((movie) => {
          return (
            <Col md={3} key={movie._id}>
              <Card>
                <Card.Img variant="top" src={movie.ImagePath + "?not-from-cache-please"} crossOrigin="Anonymous" />
                <Card.Body className="movie-card">
                  <Link to={`/movies/${movie._id}`}>
                    <Button variant="link">Open</Button>
                  </Link>
                  <Button onClick={() => removeFromFavorites(movie._id)} variant="link">Remove from Favorites</Button>
                </Card.Body>
              </Card>
            </Col>
          )
        })
        }
      </Row>
    </>
  )
}
export default FavoriteMovies