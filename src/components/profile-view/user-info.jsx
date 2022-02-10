import React from 'react';
import { Container } from 'react-bootstrap'

function UserInfo({ username, email }) {
  return (
    <>
      <Container>
        <p>Username: {username}</p>
        <p>Email: {email}</p>
      </Container>
    </>
  )
}

export default UserInfo