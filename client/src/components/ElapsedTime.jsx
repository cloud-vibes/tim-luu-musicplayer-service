import React from 'react';
import moment from 'moment';


const ElapsedTime = (props) => {
  const timeLapse = moment(props.info.time_elapsed).fromNow();
  return (
    <div className="Time-Container">
      <div className="Elapsed-time">
        {timeLapse}
      </div>
      <button className="hashtag" type="submit"># {props.info.hashtag}</button>
    </div>
  );
};

export default ElapsedTime;
