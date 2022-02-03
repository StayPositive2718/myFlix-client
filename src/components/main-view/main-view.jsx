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
import { UpdateUser } from '../update-view/update-user.jsx';

import './main-view.scss';

export class MainView extends React.Component {
  mkf

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
  }

  onUpdatedUserInfo(newUsername) {
    this.setState({
      user: newUsername.user.username
    });
    localStorage.setItem('user', newUsername.user.username);
  }

  addToFavorites(movieId) {
    let token = localStorage.getItem('token');
    let username = localStorage.getItem('user');

    axios.post(`https://matt-howell-myflix.herokuapp.com/users/${username}/movies/${movieId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    ).then(response => {
      console.log(response.data);
    }).catch(e => {
      console.error(e)
    });
  }

  render() {
    const { user, movies } = this.state;

    return (
      <>
        <NavigationView onLoggedOut={() => this.onLoggedOut()} />
        <Router>
          <Row className="main-view justify-content-md-center">
            <Route exact path="/" render={() => {
              if (!user) return (
                <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} setUserProfile={user => this.setUserProfile(user)} />
                </Col>
              );
              if (movies.length === 0) return <div className="main-view" />;
              return movies.map(m => (
                <Col md={3} key={m._id}>
                  <MovieCard movie={m} />
                </Col>
              ))
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
                <MovieView movie={movies.find(m => m._id === match.params.movieId)} addToFavorites={movie => this.addToFavorites(movie)} onBackClick={() => history.goBack()} />
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
                <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
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
                <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
              </Col>
            }} />
            <Route path={"/users"} render={({ history, match }) => {
              if (!user) return (
                <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} setUserProfile={user => this.setUserProfile(user)} />
                </Col>
              );
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <ProfileView user={user} movies={movies} onBackClick={() => history.goBack()} />
              </Col>
            }} />
            <Route path={"/users/update"} render={({ history, match }) => {
              if (!user) return (
                <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} setUserProfile={user => this.setUserProfile(user)} />
                </Col>
              );
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <UpdateUser user={user} movies={movies} onBackClick={() => history.goBack()} />
              </Col>
            }} />
          </Row>
        </Router >

      </>
    );
  }
}
