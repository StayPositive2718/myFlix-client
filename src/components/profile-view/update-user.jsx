import React from 'react';
// import PropTypes from 'prop-types';
// import { Button, Container, Row, Col, Form } from 'react-bootstrap';

function UpdateUser(user, handleSubmit, handleUpdate) {

  return (
    <form className='update-form' onSubmit={(e) => handleSubmit(e)}>
      <h2>Update user info</h2>
      <label>Username: </label>
      <input
        type='text'
        name='Username'
        defaultValue={user.user.username}
        onChange={e => handleUpdate(e)} />

      <label>Password: </label>
      <input
        type='text'
        name='Password'
        defaultValue='**********'
        onChange={e => handleUpdate(e)} />

      <label>Email address: </label>
      <input
        type='text'
        name='Email'
        defaultValue={user.user.Email}
        onChange={e => handleUpdate(e)} />

      <button variant='primary' type='submit'>
        Update
      </button>
    </form>
  )
}

export default UpdateUser
