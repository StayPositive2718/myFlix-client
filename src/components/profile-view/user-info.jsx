import React from 'react';

function UserInfo({ username, email, birthday }) {
  return (
    <>
      <p>Username: {username}</p>
      <p>Email: {email}</p>
      <p>Birthday: {birthday}</p>
    </>
  )
}

export default UserInfo