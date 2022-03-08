import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import PropTypes from 'prop-types';

class AlbumCard extends Component {
  render() {
    const { albumInfo: { artworkUrl100, collectionId,
      collectionName, artistName } } = this.props;
    return (
      <li className="AlbumCard">
        <img alt="Album art" src={ artworkUrl100 } />
        <Link
          data-testid={ `link-to-album-${collectionId}` }
          to={ `/album/${collectionId}` }
        >
          {collectionName}
        </Link>
        <p>{ artistName }</p>
      </li>
    );
  }
}

AlbumCard.propTypes = {
  artworkUrl100: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
  collectionName: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  albumInfo: PropTypes.instanceOf(Object).isRequired,
};

export default AlbumCard;
