const fs = require('fs');
const chunkNLines = require('./helpers.js').chunkNLines;
const calculateTime = require('./helpers.js').calculateTime;

let userData = fs.createWriteStream('./csv_data/users.csv');
userData.setMaxListeners(0);

let data = 'username, user image\n';

let loadUserData = () => {
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

loadUserData();

