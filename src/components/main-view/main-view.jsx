import React from 'react';
import axios from 'axios';
import { Row, Col, Container, Navbar, Nav } from 'react-bootstrap';

import { LoginView } from '../login-view/login-view.jsx';
import { MovieCard } from '../movie-card/movie-card.jsx';
import { MovieView } from '../movie-view/movie-view.jsx';

import './main-view.scss';

export class MainView extends React.Component {

  constructor() {
    super();
    // Initial state is set to null
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    };
  }

  componentDidMount() {
    axios.get('https://matt-howell-myflix.herokuapp.com/movies').then(response => {
      this.setState({
        movies: response.data
      });
    }).catch(error => {
      console.log(error);
    });
  }

  // When a movie is clicked, this function is invoked and updates the state of the 'selectedMovie' property to that movie

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  // When a user succesfully logs in, this function updates the 'user' property in state to that particular user

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  render() {
    const { user, movies, selectedMovie } = this.state;

    // If there is no user, the LoginView is CanvasRenderingContext2D.  If there is a user logged in, the user details are passed as a prop to the LoginView

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    if (movies.length === 0) return <div className="main-view" />;

    return (
      <>
        <Navbar className="nav" expand="lg" sticky="top" bg="#221F1F" variant="dark">
          <Container>
            <Navbar.Brand href="#home">MyFlix</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="">Login</Nav.Link>
                <Nav.Link href="">Register</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container className="container">
          <Row className="justify-content-md-center">
            {/* If the state of 'selectedMovie' is not null, that selected movie will be returned, otherwise, all movies will be returned */}
            {selectedMovie
              ? (
                <Col sm={12} md={4}>
                  <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                </Col>
              )
              : movies.map(movie => (
                <Col sm={6} md={3}>
                  <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }} />
                </Col>
              ))
            }
          </Row>
        </Container>
      </>
    );
  }
}
