import React, { Component } from 'react';
import Request from 'superagent';
import _ from 'lodash'

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
    let movieTitles = _.map(this.state.movies, (movie) => {
      return <li>{movie.Title}</li>
    });
    return(
      <div className="movie">
        <div className="container">
          <h2>Movie Search</h2>
          <input ref='query' className="query" type="text" placeholder="Movie Name" value={this.state.query} onChange={this.queryStateChange.bind(this)}></input>
        </div>
        <ul>{movieTitles}</ul>
      </div>
    );
  };
};

export default MovieSearch;