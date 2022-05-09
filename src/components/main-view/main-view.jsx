import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { Row, Col, } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { setMovies, setUser } from '../../actions/actions.js';
import MovieList from '../movie-list/movie-list';

import { MovieView } from '../movie-view/movie-view.jsx';
import { LoginView } from '../login-view/login-view.jsx';
import { RegistrationView } from '../registration-view/registration-view.jsx';
import { DirectorView } from '../director-view/director-view.jsx';
import { GenreView } from '../genre-view/genre-view.jsx';
import { NavigationView } from '../navigation-view/navigation-view.jsx';
import { ProfileView } from '../profile-view/profile-view.jsx';

import './main-view.scss';

class MainView extends React.Component {

  constructor() {
    super();
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.props.setUser(localStorage.getItem('user'));
      this.getMovies(accessToken)
    }
  }

  // propogates list of all movie objects in database
  getMovies(token) {
    axios.get('https://matt-howell-myflix.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => {
      this.props.setMovies(response.data);
    }).catch(function (error) {
      console.log(error);
    });
  }

  // When a user succesfully logs in, this function updates the 'user' property to that particular user

  onLoggedIn(authdata) {
    this.props.setUser(authdata.user.username);
    localStorage.setItem('token', authdata.token);
    localStorage.setItem('user', authdata.user.username);
    this.getMovies(authdata.token);
  }

  //logs out user 
  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.open('/', '_self');
  }

  render() {
    const { movies, user } = this.props;

    return (
      <>
        <NavigationView onLoggedOut={() => this.onLoggedOut()} />
        <Router>
          <Row className="main-view justify-content-center">
            <Route exact path="/" render={() => {
              if (!user) return (
                <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
              );
              if (movies.length === 0) return <div className="main-view" />;
              return <MovieList movies={movies} />
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
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
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
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
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
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
              );
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} movies={movies} />
              </Col>
            }} />
            <Route path={"/users"} render={({ history }) => {
              if (!user) return (
                <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
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

let mapStateToProps = state => {
  return { movies: state.movies, user: state.user }
}

export default connect(mapStateToProps, { setMovies, setUser })(MainView);