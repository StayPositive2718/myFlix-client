import React from 'react';
import { Card, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function FavoriteMovies({ movieList }) {
  return (
    <>
      <h1>Favorite Movies</h1>
      {movieList.map((movie) => {
        return (
          <Col md={3} key={movie._id}>
            <Card>
              <Card.Img variant="top" src={movie.ImagePath + "?not-from-cache-please"} crossOrigin="Anonymous" />
              <Card.Body className="movie-card">
                <Link to={`/movies/${movie._id}`}>
                  <Button variant="link">Open</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        )
      })
      }
    </>
  )
}
export default FavoriteMovies