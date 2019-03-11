import React from 'react';
// import styled from 'styled-components';
import moment from 'moment';

const { styled } = window;
class SoundBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bar: 0,
      randomNum: [],
      seconds: 0,
    };
    this.handleHoverChange = this.handleHoverChange.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
  }

  componentDidMount() {
    for (let i = 1; i < 275; i += 1) {
      const randomNum = () => Math.floor(Math.random() * this.props.sound.decibel);
      this.setState(state => state.randomNum.push(randomNum()));
    }
    this.timerID = setInterval(
      () => this.tick(),
      1000,
    );
  }

  tick() {
    if (this.props.play && this.state.seconds < this.props.sound.song_length) {
      this.setState({
        seconds: this.state.seconds + 1,
      });
    }
  }

  handleHoverChange(index) {
    this.setState({
      bar: index,
    });
  }

  handleLeave() {
    this.setState({
      bar: 0,
    });
  }

  handleChangeTime(index) {
    this.setState({
      bar: index,
      seconds: ((index * this.props.sound.song_length) / (273)),
    });
  }

  render() {
    const Bars = () => {
      const barArray = [];
      const barArrayBottom = [];
      for (let i = 1; i < 274; i += 1) {
        barArray.push(<BarStyleSpan
          id={`${i}`}
          style={{ height: this.state.randomNum[i] }}
          key={i}
          onMouseEnter={() => { this.handleHoverChange(i); }}
          isHovered={Boolean(this.state.bar >= i)}
          isComplete={Boolean((this.state.seconds * 4.56) / (this.props.sound.song_length / 60) >= i)}
          onClick={() => { this.handleChangeTime(i); }}
        />);
        barArrayBottom.push(<BarStyleSpan
          id={`${i}`}
          style={{ height: (this.state.randomNum[i] / 2.5) }}
          key={i}
          onMouseEnter={() => { this.handleHoverChange(i); }}
          isHovered={Boolean(this.state.bar >= i)}
          isComplete={Boolean((this.state.seconds * 4.56) / (this.props.sound.song_length / 60) >= i)}
          onClick={() => { this.handleChangeTime(i); }}
        />);
      }
      return [barArray.reverse(), barArrayBottom];
    };
    const songTime = moment.utc(this.props.sound.song_length * 1000).format('m:ss');
    const startTime = moment.utc(this.state.seconds * 1000).format('m:ss');
    return (
      <div onMouseLeave={this.handleLeave}>
        <div className="sound-container-top">
          <span className="start-time">{startTime}</span>
          {Bars()[0]}
          <span className="finish-time">{songTime}</span>
        </div>
        <div className="sound-container-bottom">
          {Bars()[1]}
        </div>
      </div>
    );
  }
}

const BarStyleSpan = styled.span`
  width: 2.5px;
  background: ${props => (props.isComplete ? '#f50'
  : props.isHovered ? 'rgb(255, 85, 0, .5)'
  : props.isHovered && props.isComplete ? 'rgb(255, 85, 0, .5)'
  : 'white')};
  margin-right: 1px;
  cursor: pointer;
`;

export default SoundBar;
