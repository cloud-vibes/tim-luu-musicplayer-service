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
 * CREATE TABLE users (id serial NOT NULL, username text NOT NULL, user_image text, PRIMARY KEY (id));
 * 
 * COPY users(username, user_image) 
 * FROM '/Users/timluu/hackreactor/system-design-capstone/tim-luu-musicplayer-service/csv_data/users.csv' 
 * DELIMITER ',' 
 * CSV HEADER;
 * 
 */



let userData = fs.createWriteStream('./csv_data/users.csv');
userData.setMaxListeners(0);

let data = 'username, user image\n';

let loadUserData = () => {
  console.log('Now loading: users');
  let start = Date.now()
  userData.write(data);
  let numOfWritesLeft = 1000000;

  let writeUsers = () => {
    let isClear = true;
    while(numOfWritesLeft > 0 && isClear) {
      let chunk = chunkNLines(1000, 'user');
      numOfWritesLeft -= chunk[1];
  
      isClear = numOfWritesLeft === 0
        ? userData.write(chunk[0], () => { calculateTime(start); })
        : userData.write(chunk[0]);
    }
    if(numOfWritesLeft > 0) {
      userData.once('drain', writeUsers);
    }
  }

  writeUsers();
};

userData.on('open', loadUserData);