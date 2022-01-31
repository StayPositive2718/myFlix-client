import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import './director-view.scss';

export function DirectorView(props) {
  const { director, onBackClick } = props;

  return (
    <div className="director-view">
      <div>
        <span>Name: </span>
        <span>{director.Name}</span>
      </div>
      <div>
        <span>About: </span>
        <span>{director.Bio}</span>
      </div>
      <div>
        <span>Born :</span>
        <span>{director.Birth}</span>
      </div>
      <div>
        <Button onClick={() => onBackClick()}>Back</Button>
      </div>
    </div>
  );
}



DirectorView.proptypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};