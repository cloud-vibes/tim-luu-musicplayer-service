import React from 'react';

const ArtistImage = props => (
  <span className="imageContainer">
    <img className="image" src={props.img} alt="" />
  </span>
);
export default ArtistImage;
