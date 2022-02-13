//Define reducers.  Modify the state for each action defined

import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES } from '../actions/actions.js';

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

const moviesApp = combineReducers({
  visibilityFilter,
  movies
});

export default moviesApp;