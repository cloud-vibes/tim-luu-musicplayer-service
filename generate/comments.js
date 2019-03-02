const fs = require('fs');
const chunkNLines = require('./helpers.js').chunkNLines;
const calculateTime = require('./helpers.js').calculateTime;

let commentData = fs.createWriteStream('./csv_data/comments.csv');
commentData.setMaxListeners(0);

let data = 'message, user id, song id\n';

let loadCommentData = () => {
  let start = Date.now();
  commentData.write(data);
  let numOfWritesLeft = 100;

  let writeComments = () => {
    let isClear = true;
    while(numOfWritesLeft > 0 && isClear) {
      let chunk = chunkNLines(20, 'comment');
      numOfWritesLeft -= chunk[1];
  
      isClear = numOfWritesLeft === 0
        ? commentData.write(chunk[0], () => { calculateTime(start); })
        : commentData.write(chunk[0]);
    }
    if(numOfWritesLeft > 0) {
      commentData.once('drain', writeComments);
    }
  }

  writeComments();
};

loadCommentData();
