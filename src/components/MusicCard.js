import propTypes from 'prop-types';
import React, { Component } from 'react';

class MusicCard extends Component {
  render() {
    const { trackName, previewUrl } = this.props;
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
      </li>
    );
  }
}

MusicCard.propTypes = {
  trackName: propTypes.string.isRequired,
  previewUrl: propTypes.string.isRequired,
};
export default MusicCard;
