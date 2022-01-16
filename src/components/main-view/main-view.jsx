import React from 'react';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [
        {
          _id: 1,
          Title: "Indiana Jones and the Raiders of the Lost Ark",
          Description: "In 1936, and archeologist and adventurer named Indiana Jones is hired by the U.S. government to find the Ark of the Covenant before Adolph Hitler's Nazis can obtain its awesome power.  Considered by any reasonable person to be the greatest movie ever made.",
          ImagePath: "./img/Raiders_of_the_Lost_Ark.jpg"
        },
        {
          _id: 2,
          Title: "This is Spinal Tap",
          Description: "Spinal Tap, one of Englands loudest bands, is chronicled by film director Marty Dibergi on what proves to be a fateful tour.",
          ImagePath: "./img/This_Is_Spinal_Tap.jpg"
        },
        {
          _id: 3,
          Title: "The Goonies",
          Description: "A group of young misfits called The Goonies discover an ancient map and set out on an adventure to find a legendary pirate's long-lost treasure.",
          ImagePath: "./img/The_Goonies.jpg",
        },
        {
          _id: 4,
          Title: "The Big Lebowski",
          Description: "Ultimate L.A. slacker Jeff 'The Dude' Lebowski, mistaken for a millionaire of the same name, seeks restitution for a rug ruined by debt collectors, enlisting his bowling buddies for help while trying to find the millionaire's missing wife.",
          ImagePath: "./img/The_Big_Lebowski.jpg",
        },
        {
          _id: 5,
          Title: "Die Hard",
          Description: "An NYPD officer tries to save his wife and several others taken hostage by German terrorists during a Christmas party at the Nakatomi Plaza in Los Angeles.", ImagePath: "./img/Die_Hard.jpg"
        },
      ],
      selectedMovie: null
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    if (movies.length === 0) return <div ClassName="main-view">The list is empty!</div>;

    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
          ))
        }
      </div>
    );
  }
}
