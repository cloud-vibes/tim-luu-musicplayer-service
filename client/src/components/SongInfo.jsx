import React from 'react';

const SongInfo = props => (
  <div className="Info-Container">
    <div className="Artist-Name">
      {props.song.username}
    </div>
    <span className="Song-Name">
      {props.song.title}
    </span>
  </div>
);

export default SongInfo;
