import React from 'react';
import axios from 'axios';
import { Row, Col, Container, Navbar } from 'react-bootstrap';

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
        <Navbar className="sticky-nav" fixed="top" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">MyFlix</Navbar.Brand>
          </Container>
        </Navbar>
        <Container>
          <Row className="main-view justify-content-md-center">
            {/* If the state of 'selectedMovie' is not null, that selected movie will be returned, otherwise, all movies will be returned */}
            {selectedMovie
              ? (
                <Col md={4}>
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
