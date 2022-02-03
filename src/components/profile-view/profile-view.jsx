import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { MovieCard } from '../movie-card/movie-card.jsx';
import { UpdateUser } from '../update-view/update-user.jsx';

export class ProfileView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userProfile: [],
      FavoriteMovies: []
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    this.getUserInfo(token)
  }

  favoriteMoviesArray(Favorite_Movies) {
    const favoriteMovies = [];
    Favorite_Movies.forEach(movieId => {
      favoriteMovies.push(this.props.movies.find(m => m._id === movieId))
    });
    return favoriteMovies
  }

  getUserInfo(token) {
    axios.get(`https://matt-howell-myflix.herokuapp.com/users/${this.props.user}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => {
      this.setState({
        userProfile: response.data,
        FavoriteMovies: this.favoriteMoviesArray(response.data.Favorite_Movies)
      });
      console.log(this.state.FavoriteMovies)
    }).catch(function (error) {
      console.log(error);
    });
  };


  render() {

    return (
      <>
        <Row>
          {/* display user info */}
          <div>
            <p>Username: {this.state.userProfile.username}</p>
            <p>Email: {this.state.userProfile.Email}</p>
            <p>Birthday: {this.state.userProfile.Birthday}</p>
            <Link to={"/users/update"}>
              <Button variant="link">Update User Information</Button>
            </Link>
          </div>
        </Row>
        <Row>
          {/* List of favorite movies */}
          <div>
            <h1>Favorite Movies</h1>
          </div>
          {this.state.FavoriteMovies.map(movie => (
            <Col md={3} key={movie._id}>
              <MovieCard movie={movie} />
            </Col>
          ))}
        </Row>
        <div>
          {/* update user info */}
        </div>
      </>
    )
  }
}