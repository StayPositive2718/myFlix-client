import React from 'react';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card.jsx';

export class ProfileView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userProfile: [],
      username: '',
      password: '',
      Email: '',
      Birthday: '',
      FavoriteMovies: []
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    this.getUserInfo(token)
  }
  getUserInfo(token) {
    axios.get(`https://matt-howell-myflix.herokuapp.com/users/${this.props.user}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => {
      this.setState({
        userProfile: response.data,
        FavoriteMovies: response.data.Favorite_Movies
      });
    }).catch(function (error) {
      console.log(error);
    });
  };
  render() {


    return (
      <div>
        <div>
          <div>
            {/* display user info */}
            <span>Username: </span>
            <span>{this.state.userProfile.username}</span>
          </div>
          <div>
            <span>Email: </span>
            <span>{this.state.userProfile.Email}</span>
          </div>
          <div>
            <span>Birthday: </span>
            <span>{this.state.userProfile.Birthday}</span>
          </div>
        </div>
        <div>
          {/* List of favorite movies */}
          <div>
            <span>{this.state.FavoriteMovies}</span>
            {/* // .map(m => (<Col md={3}><MovieCard movie={m} /></Col>))} */}
          </div>
        </div>
        <div>
          {/* add or remove movies from favorite list */}
        </div>
        <div>
          {/* update user info */}
        </div>
      </div >
    )
  }
}