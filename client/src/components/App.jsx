import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faToggleOff, faPauseCircle } from '@fortawesome/free-solid-svg-icons';
import ArtistImage from './ArtistImage';
import PlayButton from './PlayButton';
import SongInfo from './SongInfo';
import ElapsedTime from './ElapsedTime';
import SoundBar from './SoundBar';
import Comment from './Comment';
import axios from 'axios';
// import ajax from '../../lib/ajax';

library.add(faPlayCircle);
library.add(faPauseCircle);
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: [],
      songs: [],
      randomImage: [],
      randomComment: [],
      randomName: [],
      songsUrl: [],
      playStatus: false,
    };
    this.handlePlayButton = this.handlePlayButton.bind(this);
  }

  componentDidMount() {
    this.getSongAndComments();
  }

  getSongAndComments() {
    let songId = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];
    
    axios.get(`/api/musicplayer/song/${songId}/`)
      .then((response) => {
        let {song, comments} = response.data;
        this.setState({
          image: song.song_image,
          songs: song,
          songsUrl: song.song_url,
          randomName: comments.reduce((total, current) => {
            return total.concat(current.username);
          }, []),
          randomImage: comments.reduce((total, current) => {
            return total.concat(current.user_image);
          }, []),
          randomComment: comments.reduce((total, current) => {
            return total.concat(current.message);
          }, [])
        });
      })
      .catch((err) => {
        console.log('Unable to retrieve song and comments.');
      });
  }

  handlePlayButton() {
    this.setState({
      playStatus: !this.state.playStatus,
    });
  }

  render() {
    return (
      <div>
        <div className="container">
          <ArtistImage img={this.state.image} />
          <ElapsedTime info={this.state.songs} />
          <SongInfo song={this.state.songs} />
          <PlayButton onToggle={this.handlePlayButton} play={this.state.playStatus} songUrl={this.state.songsUrl} />
          {
            this.state.songs.decibel
            && this.state.songs.song_length
            && this.state.image
            && this.state.randomImage
            && (
            <div>
              <div className="soundbar">
                <SoundBar
                  sound={this.state.songs}
                  play={this.state.playStatus}
                />
              </div>
              <div>
                <Comment
                  random={this.state.randomImage}
                  info={this.state.randomComment}
                  name={this.state.randomName}
                  play={this.state.playStatus}
                  song={this.state.songs}
                />
              </div>
            </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default App;
