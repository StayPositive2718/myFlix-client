import React from 'react';
import axios from 'axios';
import { Row, Col, } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { MovieView } from '../movie-view/movie-view.jsx';
import { LoginView } from '../login-view/login-view.jsx';
import { MovieCard } from '../movie-card/movie-card.jsx';
import { RegistrationView } from '../registration-view/registration-view.jsx';
import { DirectorView } from '../director-view/director-view.jsx';
import { GenreView } from '../genre-view/genre-view.jsx';
import { NavigationView } from '../navigation-view/navigation-view.jsx';
import { ProfileView } from '../profile-view/profile-view.jsx';

import './main-view.scss';

export class MainView extends React.Component {

  constructor() {
    super();
    // Initial state is set to null
    this.state = {
      movies: [],
      user: null,
      userProfile: {}
    }
  }

  getMovies(token) {
    axios.get('https://matt-howell-myflix.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => {
      //Assign the result to the state
      this.setState({
        movies: response.data
      });
    }).catch(function (error) {
      console.log(error);
    });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken)
    }
  }

  // When a user succesfully logs in, this function updates the 'user' property in state to that particular user

  onLoggedIn(authdata) {
    this.setState({
      user: authdata.user.username
    });

    localStorage.setItem('token', authdata.token);
    localStorage.setItem('user', authdata.user.username);
    this.getMovies(authdata.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
    window.open('/', '_self');
  }

  addToFavorites(movieId) {
    let token = localStorage.getItem('token');
    let username = localStorage.getItem('user');

    axios.post(`https://matt-howell-myflix.herokuapp.com/users/${username}/movies/${movieId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    ).then(alert('Added to Favorites!')).catch(e => {
      console.error(e)
    });
  }

  render() {
    const { user, movies } = this.state;

    return (
      <>
        <NavigationView onLoggedOut={() => this.onLoggedOut()} />
        <Router>
          <Row className="main-view justify-content-center">
            <Route exact path="/" render={() => {
              if (!user) return (
                <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} setUserProfile={user => this.setUserProfile(user)} />
                </Col>
              );
              if (movies.length === 0) return <div className="main-view" />;
              return <Col>
                <MovieCard movies={movies} addToFavorites={movie => this.addToFavorites(movie)} />
              </Col>
            }} />
            <Route path="/register" render={() => {
              if (user) return <Redirect to="/" />
              return <Col md={8}>
                <RegistrationView />
              </Col>
            }} />
            <Route path="/movies/:movieId" render={({ match, history }) => {
              if (!user) return (
                <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} setUserProfile={user => this.setUserProfile(user)} />
                </Col>
              );
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
              </Col>
            }} />
            <Route path="/directors/:name" render={({ match, history }) => {
              if (!user) return (
                <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} setUserProfile={user => this.setUserProfile(user)} />
                </Col>
              );
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} movies={movies} />
              </Col>
            }} />
            <Route path="/genres/:name" render={({ match, history }) => {
              if (!user) return (
                <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} setUserProfile={user => this.setUserProfile(user)} />
                </Col>
              );
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} movies={movies} />
              </Col>
            }} />
            <Route path={"/users"} render={({ history, match }) => {
              if (!user) return (
                <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} setUserProfile={user => this.setUserProfile(user)} />
                </Col>
              );
              if (movies.length === 0) return <div className="main-view" />;
              return <Col>
                <ProfileView movies={movies} onBackClick={() => history.goBack()} />
              </Col>
            }} />
          </Row>
        </Router >

      </>
    );
  }
}
