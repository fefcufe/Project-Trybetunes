import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      albumName: '',
      musicsList: [],
    };
  }

  // recuperar o id passado como parametro para fazer a
  // requisição com esse id e passar as informacoes
  // para renderização da pagina Album

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    /* console.log(id);
    console.log(typeof id); */
    const musics = await getMusics(id);
    /* console.log(musics); */
    this.setState({
      musicsList: musics,
      artistName: musics[0].artistName,
      albumName: musics[0].collectionName,
      collectionArt: musics[0].artworkUrl100,
    });
  }

  render() {
    const { artistName, albumName, musicsList,
      collectionArt } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <section id="musics">
          <img alt="collection art" src={ collectionArt } />
          <h1 data-testid="artist-name">
            { artistName }
          </h1>

          <h3 data-testid="album-name">{ albumName }</h3>
          <ul>
            { musicsList.map((music, index) => {
              if (index === 0) return null;
              return (<MusicCard
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
                trackId={ music.trackId }
                music={ music }
                key={ music.trackId }
                // checked={ favoritesSongs.includes(music.trackId) }
              />);
            })}
          </ul>

        </section>

      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
export default Album;
