import React from 'react';
import { MovieCard } from '../movie-card/movie-card';

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [
        { _id: 1, Title: 'Indianas Jones and the Raiders of the Lost Ark', Description: 'description 1...', ImagePath: '...' },
        { _id: 2, Title: 'The Big Lebowski', Description: 'description 2...', ImagePath: '...' },
        { _id: 3, Title: 'The Goonies', Description: 'description 3...', ImagePath: '...' }
      ]
    }
  }

  render() {
    const movies = this.state.movies;

    if (movies.length === 0) {
      return <div ClassName="main-view">The list is empty!</div>;
    }

    return (
      <div className="main-view">
        {movies.map(movie => <MovieCard />)}
      </div>
    );
  }
}
