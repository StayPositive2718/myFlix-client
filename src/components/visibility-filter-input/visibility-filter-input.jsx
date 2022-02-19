import React from 'react';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';

import { setFilter } from '../../actions/actions';

// sets filter to search for movies
function VisiblityFilterInput(props) {
  return <Form.Control onChange={e => props.setFilter(e.target.value)}
    value={props.visiblityFilter}
    placeholder="filter"
  />;
}

export default connect(
  null,
  { setFilter }
)(VisiblityFilterInput);