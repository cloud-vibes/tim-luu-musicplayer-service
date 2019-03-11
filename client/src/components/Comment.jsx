import React from 'react';
// import styled from 'styled-components';
const { styled } = window;

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 0,
      commentCount: 0,
      seconds: 0,
    };
    this.handleHoverChange = this.handleHoverChange.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
  }

  componentDidMount() {
    const randomNum = () => Math.floor(Math.random() * 60) + 20;
    this.setState({
      commentCount: randomNum(),
    });
    this.timerID = setInterval(
      () => this.tick(),
      1000,
    );
  }

  tick() {
    if (this.props.play && this.state.seconds < this.props.song.song_length) {
      this.setState({
        seconds: this.state.seconds + 1,
      });
    }
  }

  handleHoverChange(index) {
    this.setState({
      display: index,
    });
  }

  handleLeave() {
    this.setState({
      display: 0,
    });
  }

  handleClickChange(index) {
    console.log(this.state.seconds);
    this.setState({
      seconds: index * (this.props.song.song_length / this.state.commentCount),
    });
  }

  render() {
    const CommentImage = () => {
      const imgArray = [];
      for (let i = 1; i < this.state.commentCount; i += 1) {
        imgArray.push(
          <CommentDiv
            key={i}
            style={{ backgroundImage: `url(${this.props.random[i]})` }}
            onMouseEnter={() => this.handleHoverChange(i)}
            onMouseLeave={() => this.handleLeave()}
            isHovered={Boolean(this.state.display === i)}
            isCurrent={Boolean((i * (this.props.song.song_length / this.state.commentCount)) <= this.state.seconds
              && ((i + 1) * (this.props.song.song_length / this.state.commentCount)) >= this.state.seconds
              && this.state.display === 0)}
            onClick={() => this.handleClickChange(i)}
          >
            <CommentSpan
              isHovered={Boolean(this.state.display === i)}
              isCurrent={Boolean((i * (this.props.song.song_length / this.state.commentCount)) <= this.state.seconds
                && ((i + 1) * (this.props.song.song_length / this.state.commentCount)) >= this.state.seconds
                && this.state.display === 0)}
            >
              {this.props.info[i]}
            </CommentSpan>
            <NameSpan
              isHovered={Boolean(this.state.display === i)}
              isCurrent={Boolean((i * (this.props.song.song_length / this.state.commentCount)) <= this.state.seconds
                && ((i + 1) * (this.props.song.song_length / this.state.commentCount)) >= this.state.seconds
                && this.state.display === 0)}
            >
              {this.props.name[i]}
            </NameSpan>
          </CommentDiv>,
        );
      }
      return imgArray;
    };
    return (
      <div className="comment-container">
        {CommentImage()}
      </div>
    );
  }
}

const CommentDiv = styled.div`
  width: 22px;
  height: 22px;
  justify-content: space-between;
`;

const CommentSpan = styled.span`
  color: white;
  font-size: 10px;
  position: absolute;
  top: 100%;
  margin-top: 10px;
  margin-left: 34px;
  padding-left: 7%;
  visibility: ${props => (props.isHovered ? 'visible' : props.isCurrent ? 'visible' : 'hidden')}
`;

const NameSpan = styled.span`
  color: #f50;
  font-size: 10px;
  position: absolute;
  top: 100%;
  margin-top: 10px;
  visibility: ${props => (props.isHovered ? 'visible' : props.isCurrent ? 'visible' : 'hidden')}
`;

export default Comment;
