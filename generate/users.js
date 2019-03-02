const fs = require('fs');
const faker = require('faker');

let userData = fs.createWriteStream('../csv_data/users.csv');
userData.setMaxListeners(0);

let data = 'username, user image\n';

let urls = [];
for(let url = 0; url < 1000; url++) {
  urls.push(faker.image.imageUrl());
}

let loadUserData = () => {
  let start = Date.now()
  userData.write(data);
  let numOfWritesLeft = 100;

  let writeData = () => {
    let isClear = true;
    while(numOfWritesLeft > 0 && isClear) {
      let chunk = chunkNLines(10);
      numOfWritesLeft -= chunk[1];
  
      isClear = numOfWritesLeft === 0
        ? userData.write(chunk[0], () => { calculateTime(start); })
        : userData.write(chunk[0]);
    }
    if(numOfWritesLeft > 0) {
      userData.once('drain', writeData);
    }
  }

  writeData();
};

loadUserData();

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
    let username = `"${faker.internet.userName()}"`;
    let user_image = urls[getRandomInt(0, 1000)];
    
    data += `${username},${user_image}\n`;
  }

  return [data, n];
}

function calculateTime(start) {
  let millis = Date.now() - start;
  let seconds = Math.floor(millis/1000);
  console.log(`Finished in ${seconds} seconds.`);
}