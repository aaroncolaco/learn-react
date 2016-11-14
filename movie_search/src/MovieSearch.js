import React, { Component } from 'react';
import Request from 'superagent';
import _ from 'lodash'

import './MovieSearch.css';


class MovieSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      'query': this.props.query,
      'movies': ''
    };
  };

  componentWillMount() {
    this.searchMovies(); // only for first time. when page loads to perform search
  };

  componentDidMount() {
  };

  componentWillReceiveProps(newProps) {
  };

  shouldComponentUpdate(newProps, newState) {
    return true;
  };

  componentWillUpdate(nextProps, nextState) {
  };

  componentDidUpdate(prevProps, prevState) {
  };

  componentWillUnmount() {
  };

  queryStateChange(e) {
    this.setState({ query: e.target.value }, () => {this.searchMovies(this.state.query)});
  }

  searchMovies(query='star') {
    let url = `http://www.omdbapi.com?s=${query}&y=&r=json&plot=short`;
    Request.get(url)
      .then((response) => {
        this.setState({
          movies: response.body.Search
        });
      });
  };

  render(){
    console.log(this.state.movies);
    let movieTitles = _.map(this.state.movies, (movie) => {
      return(
        <li className="movie" key={movie.imdbID}>
          <span className="heading col-md-8">
            <b>
              <a href={'https://www.google.co.in/search?q=' + movie.Title}>{movie.Title}</a>
            </b> - {movie.Year}
          </span>
          <img className="movie-poster col-md-4" alt={movie.Title + ' image'} src={movie.Poster}/>
        </li>
      );
    });

    return(
      <div className="movies">
        <div className="container">
          <div className="search">
            <h2>Movie Search</h2>
            <input className="query" type="text" placeholder="Movie Name" value={this.state.query} onChange={this.queryStateChange.bind(this)}></input>
          </div>
          <br />
          <ul>{movieTitles}</ul>
        </div>
      </div>
    );
  };
};

export default MovieSearch;