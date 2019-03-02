const fs = require('fs');
const faker = require('faker');

/*
 *
 * PURPOSE: to write (or overwrite) a .CSV
 * file to be loaded into Postgres. Each CSV
 * will correspond to a column identifier inside
 * the table that the .CSV corresponds to.
 * 
 */

let songData = fs.createWriteStream('../csv_data/songs.csv');
songData.setMaxListeners(0);

let data = 'title, artist, hashtag, time elapsed, start time, song length, decibel, song url, song image\n';

let dates = [];
for(let day = 0; day < 90; day++) {
  dates.push(faker.date.past(1));
}

let urls = [];
for(let url = 0; url < 1000; url++) {
  urls.push(faker.image.imageUrl());
}

let loadSongData = () => {
  let start = Date.now();
  songData.write(data);
  let numOfWritesLeft = 100;

  let writeSongs = () => {
    let isClear = true;
    while(numOfWritesLeft > 0 && isClear) {
      let chunk = chunkNLines(20);
      numOfWritesLeft -= chunk[1];
      
      isClear = numOfWritesLeft === 0 
        ? songData.write(chunk[0], () => { calculateTime(start); })
        : songData.write(chunk[0]);
    }
    if(numOfWritesLeft > 0) {
      songData.once('drain', () => {
        writeSongs();
      });
    }
  }

  writeSongs();
}

loadSongData();

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
    let title = `"${faker.random.words()}"`;
    let artist = getRandomInt(0, 1000000);
    let hashtag = `"${faker.random.word()}"`;
    let timeElapsed = dates[getRandomInt(0, 90)];
    let startTime = 0;
    let songLength = getRandomInt(120, 500); // 120 <--> 620
    let decibel = getRandomInt(62, 18); // 62 <--> 80
    let songUrl = urls[getRandomInt(0, 1000)];
    let songImage = urls[0];
    
    data += `${title},${artist},${hashtag},${timeElapsed},${startTime},${songLength},${decibel},${songUrl},${songImage}\n`;
  }

  return [data, n];
}

function calculateTime(start) {
  let millis = Date.now() - start;
  let seconds = Math.floor(millis/1000);
  console.log(`Finished in ${seconds} seconds.`);
}