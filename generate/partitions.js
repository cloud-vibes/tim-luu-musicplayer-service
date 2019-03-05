const fs = require('fs');
const faker = require('faker');
const getRandomInt = require('./helpers.js').getRandomInt;
const calculateTime = require('./helpers.js').calculateTime;

let songData = fs.createWriteStream('./csv_data/song_partitions.csv');

// 1 million users
// 10 million songs
// 100 million comments

// small case:
// 10 users
// 100 songs
// 1000 comments

let data = `song_id,title,artist,hashtag,time_elapsed,start_time,song_length,decibel,song_url,song_image,username,user_message,user_image\n`;

let loadPartitions = () => {
  // loop through number of songs that need to be generated
  // for each song
  // create 10 comments
  console.log('Now generating song partitions...');
  let start = Date.now();
  songData.write(data);
  let numOfWritesLeft = 100;

  let writePartitions = () => {
    let isClear = true;
    while(numOfWritesLeft > 0 && isClear) { 
      let partition = partitionCommentsForSong(101 - numOfWritesLeft);
      numOfWritesLeft -= 1;

      isClear = numOfWritesLeft === 0
        ? songData.write(partition, () => { calculateTime(start); })
        : songData.write(partition);
    }
    if(numOfWritesLeft > 0) {
      songData.once('drain', writePartitions);
    }
  }
  writePartitions();
}

songData.on('open', loadPartitions);

/*
 *
 * HELPER FUNCTION
 *
 */

let dates = [];
for(let day = 0; day < 90; day++) {
  dates.push(faker.date.past(1).toISOString());
}

let urls = [];
for(let url = 0; url < 1000; url++) {
  urls.push(faker.image.imageUrl());
}


function partitionCommentsForSong(id) {
  let data = ``;
  
  let title = `"song no. ${id}"`;
  let artist = `"artist no. ${getRandomInt(1, 9)}"`;
  let hashtag = `"${faker.random.word()}"`;
  let timeElapsed = dates[getRandomInt(0, 90)];
  let startTime = 0;
  let songLength = getRandomInt(120, 500); // 120 <--> 620
  let decibel = getRandomInt(62, 18); // 62 <--> 80
  let songUrl = urls[0];
  let songImage = urls[getRandomInt(0, 1000)];

  let song = `${id},${title},${artist},${hashtag},${timeElapsed},${startTime},${songLength},${decibel},${songUrl},${songImage},`;
  for(let i = 0; i < 10; i++) {
    let username = `"user no. ${getRandomInt(1, 9)}"`;
    let message = `"${faker.lorem.sentence()}"`;
    let userImage = urls[getRandomInt(0, 1000)];

    let comment = `${username},${message},${userImage}\n`
    data += song + comment; 
  }

  return data;
}