import React from 'react';

export class MovieCard extends React.Component {
  render() {
    const { Movie } = this.props;
    return <div className="movie-card">Some Title</div>;
  }
}