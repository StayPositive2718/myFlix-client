import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function MovieView({ movie, onBackClick }) {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <>
      <Container fluid>
        <Row className="custom-class justify-content-center">
          <Col><Button onClick={() => onBackClick()}>Back</Button></Col>
          <Col xs={12} sm={6} md={6}>
            <Card className="custom-class" >
              <Card.Img variant="top" src={movie.ImagePath + "?not-from-cache-please"} crossOrigin="Anonymous" />
            </Card>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col>
            <Card className="custom-class">
              <Card.Body>
                <Card.Text>{movie.Description}</Card.Text>
                <Link to={`/directors/${movie.Director.Name}`}>
                  <Button variant="link">Director</Button>
                </Link>
                <Link to={`/genres/${movie.Genre.Name}`}>
                  <Button variant="link">Genre</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

MovieView.proptypes = {
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
