import React from 'react';
import { Row, Figure, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './profile-view.scss'

function FavoriteMovies({ movieList, removeFromFavorites }) {
  return (
    <Card className="custom-class favorites-header">
      <Card.Body>
        <Row className="justify-content-center">
          <Col xs={12}>
            <h1>Favorite Movies</h1>
          </Col>
        </Row>
        <Row className="justify-content-center">
          {movieList.map((movie) => {
            return (
              <Col xs={12} md={6} lg={3} key={movie._id} className="fav-movies">
                <Figure>
                  <Link to={`/movies/${movie._id}`}>
                    <Figure.Image src={movie.ImagePath + "?not-from-cache-please"} crossOrigin="Anonymous" alt={movie.Title} />
                  </Link>
                </Figure>
                <Button onClick={() => removeFromFavorites(movie._id)} variant="link">Remove from Favorites</Button>
              </Col>
            )
          })
          }
        </Row>
      </Card.Body>
    </Card>

  )
}
export default FavoriteMovies