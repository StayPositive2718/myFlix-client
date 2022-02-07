import React, { useState, useEffect } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import axios from 'axios';
// import { Link } from 'react-router-dom';

import UserInfo from './user-info.jsx'
import FavoriteMovies from './favorite-movies.jsx'
import { LoginView } from '../login-view/login-view.jsx';
// import UpdateUser from './update-user.jsx'


export function ProfileView(props) {
  const [userProfile, setUserProfile] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [params, setParams] = useState([])

  const getUser = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    console.log(user);
    axios.get(`https://matt-howell-myflix.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => {
      const favoriteMovieList = props.movies.filter(movie => response.data.Favorite_Movies.includes(movie._id));
      setUserProfile(response.data);
      setFavoriteMovies(favoriteMovieList)
    }).catch(function (error) {
      console.log(error);
    });
  }

  const removeFromFavorites = (movieId) => {
    let token = localStorage.getItem('token');
    let username = localStorage.getItem('user');
    axios.delete(`https://matt-howell-myflix.herokuapp.com/users/${username}/movies/${movieId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    ).then(response => {
      const favoriteMovieList = props.movies.filter(movie => response.data.Favorite_Movies.includes(movie._id));
      setFavoriteMovies(favoriteMovieList)
    }).catch(e => {
      console.error(e)
    });
  }

  const validate = () => {
    let isReq = true;
    if (!newUsername) {
      setNewUsername(userProfile.username);
    } else if (newUsername.length < 5) {
      setUsernameErr('Username must be 5 characters long');
      isReq = false;
    }
    if (!newEmail) {
      setNewEmail(userProfile.Email)
    } else if (!newEmail.includes('@')) {
      setEmailErr('Email not formatted correctly');
      isReq = false;
    }
    setParams({
      username: newUsername,
      password: newPassword,
      Email: newEmail
    })
    if (!newPassword) {
      setParams({
        username: newUsername,
        Email: newEmail
      });
    } else if (newPassword.length < 5) {
      setPasswordErr('Password must be 5 characters long');
      isReq = false;
    }
    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newEmail)
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const isReq = validate();
    if (isReq) {
      axios.put(`https://matt-howell-myflix.herokuapp.com/users/${user}`,
        {
          username: newUsername,
          Email: newEmail
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }).then(response => {
          console.log(response.data.username);
          localStorage.setItem('user', response.data.username);
          getUser();
          alert('Update succesful');
        }).catch(e => {
          console.error(e).
            alert('update unsuccesful');

        });
    }
  };

  // const handleUpdate = (e) => {
  //   if (e.target.name === "Password") {
  //     setNewPassword(e.target.value);
  //   } else if (e.target.name === "Username") {
  //     setNewUsername(e.target.value)
  //   } else if (e.target.name === "Email") {
  //     setNewEmail(e.target.value)
  //     console.log(newEmail)
  //   }
  // }

  const deleteUser = () => {
    const confirm = window.confirm('Are you dure you want to delete your account?');
    if (confirm) {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      axios.delete(`https://matt-howell-myflix.herokuapp.com/users/${user}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }).then(response => {
          alert(response.data);
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          window.open('/', '_self');
        }).catch(function (error) {
          console.log(error);
        });
    }
  }

  useEffect(() => {
    getUser();
  }, [])

  return (
    <>
      {/* display user info */}
      <UserInfo username={userProfile.username} email={userProfile.Email} />
      {/* List of favorite movies */}
      <FavoriteMovies movieList={favoriteMovies} removeFromFavorites={removeFromFavorites} />
      {/* Update user information */}
      <form className='update-form' onSubmit={(e) => handleSubmit(e)}>
        <h2>Update user info</h2>
        <label>Username: </label>
        <input
          type='text'
          name='Username'
          placeholder={userProfile.username}
          value={newUsername}
          onChange={e => setNewUsername(e.target.value)} />
        {usernameErr && <p>{usernameErr}</p>}

        <label>Password: </label>
        <input
          type='text'
          name='Password'
          placeholder='**********'
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)} />
        {passwordErr && <p>{passwordErr}</p>}

        <label>Email address: </label>
        <input
          type='text'
          name='Email'
          placeholder={userProfile.Email}
          value={newEmail}
          onChange={e => setNewEmail(e.target.value)} />
        {emailErr && <p>{emailErr}</p>}

        <button variant='primary' type='submit'>
          Update
        </button>
      </form>
      )
      <Button onClick={() => deleteUser()}>Delete User Account</Button>
    </>
  )
}

