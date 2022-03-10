import propTypes from 'prop-types';
import React, { Component } from 'react';
import Loading from '../pages/Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      checked: false,
      favoriteSongs: [],
    };
  }

  /* async componentDidMount() {
  } */
  async componentDidMount() {
    const response = await getFavoriteSongs();
    // console.log(response);
    this.setState((prevState) => ({
      favoriteSongs: [...prevState.favoriteSongs, ...response],
    }));
    // console.log(this.state.favoriteSongs);
  }

  handleCheckbox = async (musica) => {
    this.setState({
      loading: true,
    });
    await addSong(musica);
    // console.log(response); OK
    this.setState({
      loading: false,
      checked: true,
    });
  }

  render() {
    const { trackName, previewUrl, trackId, music } = this.props;
    const { loading, checked } = this.state;
    if (loading) return <Loading />;
    return (
      <li className="music">
        <p>{ trackName }</p>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>

        <label htmlFor="favorite">
          <input
            id="favorite"
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ () => this.handleCheckbox(music) }
            checked={ checked }
          />
        </label>
      </li>
    );
  }
}

MusicCard.propTypes = {
  trackName: propTypes.string.isRequired,
  previewUrl: propTypes.string.isRequired,
  trackId: propTypes.number.isRequired,
  music: propTypes.instanceOf(Object).isRequired,
};

export default MusicCard;
