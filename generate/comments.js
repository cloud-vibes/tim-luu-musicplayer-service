const fs = require('fs');
const faker = require('faker');

let commentData = fs.createWriteStream('../csv_data/comments.csv');
commentData.setMaxListeners(0);

let data = 'message, user id, song id\n';

let loadCommentData = () => {
  let start = Date.now();
  commentData.write(data);
  let numOfWritesLeft = 100;

  let writeData = () => {
    let isClear = true;
    while(numOfWritesLeft > 0 && isClear) {
      let chunk = chunkNLines(10);
      numOfWritesLeft -= chunk[1];
  
      isClear = numOfWritesLeft === 0
        ? commentData.write(chunk[0], () => { calculateTime(start); })
        : commentData.write(chunk[0]);
    }
    if(numOfWritesLeft > 0) {
      commentData.once('drain', writeData);
    }
  }

  writeData();
};

loadCommentData();

/*
 *
 * Helper Functions
 *
 */

function getRandomInt(min, range) {
  return min + Math.floor(Math.random() * range);
};

function chunkNLines(n) {
  data = '';
  for(let i = 0; i < n; i++) {
    let message = `"${faker.lorem.sentences()}"`;
    let user_id = getRandomInt(0, 1000000);
    let song_id = getRandomInt(0, 10000000);
    
    data += `${message},${user_id},${song_id}\n`;
  }

  return [data, n];
}

function calculateTime(start) {
  let millis = Date.now() - start;
  let seconds = Math.floor(millis/1000);
  console.log(`Finished in ${seconds} seconds.`);
}