import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      isButtonDisabled: true,
      artist: '',
    };
  }

  buttonValidation = ({ target: { value } }) => {
    const { artist } = this.state;
    console.log(artist);
    const minLength = 2;
    const artistLength = value.length;
    this.setState({
      artist: value,
      isButtonDisabled: artistLength < minLength,
    });
  }

  render() {
    const { isButtonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form id="searchForm">
          <input data-testid="search-artist-input" onChange={ this.buttonValidation } />
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ isButtonDisabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
