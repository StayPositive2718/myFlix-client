import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import './genre-view.scss';

export function GenreView(props) {
  const { genre, onBackClick } = props;
  console.log(genre);

  return (
    <div className="genre-view">
      <div>
        <span>Name :</span>
        <span>{genre.Name}</span>
      </div>
      <div>
        <span>About :</span>
        <span>{genre.Decription}</span>
      </div>
      <div>
        <Button onClick={() => onBackClick()}>Back</Button>
      </div>
    </div>
  );
}

GenreView.proptypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};