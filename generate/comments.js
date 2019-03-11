const fs = require('fs');
const chunkNLines = require('./helpers.js').chunkNLines;
const calculateTime = require('./helpers.js').calculateTime;

/*
 *
 * PURPOSE: to write (or overwrite) a .CSV
 * file to be loaded into Postgres. Each CSV
 * will correspond to a column identifier inside
 * the table that the .CSV corresponds to.
 * 
 * Query Commands:
 * CREATE TABLE comments (id serial NOT NULL,message text NOT NULL,user_id int NOT NULL,song_id int NOT NULL,PRIMARY KEY (id));
 * 
 * ALTER TABLE comments ADD CONSTRAINT constraint_fk_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
 * ALTER TABLE comments ADD CONSTRAINT constraint_fk_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
 * 
 * CREATE INDEX idx_comments_song_id ON comments(song_id);
 * 
 * COPY comments(message, user_id, song_id) 
 * FROM '/Users/timluu/hackreactor/system-design-capstone/tim-luu-musicplayer-service/csv_data/comments.csv' 
 * DELIMITER ',' 
 * CSV HEADER;
 */

let commentData = fs.createWriteStream('./csv_data/comments.csv');
commentData.setMaxListeners(0);

let data = 'message, user id, song id\n';

let loadCommentData = () => {
  console.log('Now loading: comments');
  let start = Date.now();
  commentData.write(data);
  let numOfWritesLeft = 25000000;

  let writeComments = () => {
    let isClear = true;
    while(numOfWritesLeft > 0 && isClear) {
      let chunk = chunkNLines(1000, 'comment');
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

commentData.on('open', loadCommentData);