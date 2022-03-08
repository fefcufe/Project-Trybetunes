import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import AlbumCard from '../components/AlbumCard';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      isButtonDisabled: true,
      artist: '',
      loading: false,
      searchThisName: '',
      arrayOfAlbums: [],
    };
  }

  buttonValidation = ({ target: { value } }) => {
    /* const { artist } = this.state;
    console.log(artist); */
    const minLength = 2;
    const artistLength = value.length;
    this.setState({
      artist: value,
      isButtonDisabled: artistLength < minLength,
    });
  }

  getAlbums = async () => {
    const { artist } = this.state;
    this.setState({
      loading: true,
      searchThisName: artist,
    });
    const albums = await searchAlbumsAPI(artist);
    // console.log(albums);
    this.setState({
      loading: false,
      arrayOfAlbums: albums,
      isButtonDisabled: true,
      artist: '',
    });
    /* console.log(this.state.arrayOfAlbums) */
  }

  render() {
    const { isButtonDisabled, loading, arrayOfAlbums,
      artist, searchThisName } = this.state;
    if (loading) return <Loading />;
    return (
      <div data-testid="page-search">
        <Header />
        <form id="searchForm">

          <input
            data-testid="search-artist-input"
            value={ artist }
            onChange={ this.buttonValidation }
          />

          <button
            data-testid="search-artist-button"
            type="submit"
            disabled={ isButtonDisabled }
            onClick={ this.getAlbums }
          >
            Pesquisar
          </button>

        </form>

        { arrayOfAlbums.length === 0
          ? (<p> Nenhum álbum foi encontrado </p>) : (
            <section id="allAlbums">
              <h3>
                {`Resultado de álbuns de: 
                ${searchThisName}`}
              </h3>
              <ul>
                { arrayOfAlbums.map((album) => (
                  <AlbumCard key={ album.collectionId } albumInfo={ album } />
                ))}
              </ul>
            </section>
          )}
      </div>
    );
  }
}

export default Search;
