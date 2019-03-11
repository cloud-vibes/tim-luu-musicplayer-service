import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class PlayButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialPlay: false,
    };
    this.controller = this.controller.bind(this);
  }

  componentDidMount() {
    this.setState({
      initialPlay: true,
    });
  }

  controller() {
    const player = document.getElementById('fredness');
    player.paused ? player.play() : player.pause();
  }

  render() {
    return (
      <div className="btnContainer">
        {!this.props.play ? <FontAwesomeIcon onClick={() => { this.props.onToggle(); this.controller(); }} style={{ height: '60px', width: '60px' }} className="playBtn" icon="play-circle" />
          : <FontAwesomeIcon onClick={() => { this.props.onToggle(); this.controller(); }} style={{ height: '60px', width: '60px' }} className="playBtn" icon="pause-circle" />
    }
        {this.props.songUrl && this.state.initialPlay
        && (
        <audio controls style={{ display: 'none'} } id="fredness" name="media">
          <source id="songsrc" src={this.props.songUrl} type="audio/mp3" />
        </audio>
        )
    }
      </div>
    );
  }
}


export default PlayButton;
