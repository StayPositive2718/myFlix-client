import React from 'react';

function UserInfo({ username, email }) {
  return (
    <>
      <p>Username: {username}</p>
      <p>Email: {email}</p>
    </>
  )
}

export default UserInfo