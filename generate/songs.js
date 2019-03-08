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
 */

let songData = fs.createWriteStream('./csv_data/songs.csv');
songData.setMaxListeners(0);

let data = 'title, artist, hashtag, time elapsed, start time, song length, decibel, song url, song image\n';

let loadSongData = () => {
  console.log('Now loading: songs');
  let start = Date.now();
  songData.write(data);
  let numOfWritesLeft = 10000000;

  let writeSongs = () => {
    let isClear = true;
    while(numOfWritesLeft > 0 && isClear) {
      let chunk = chunkNLines(1000, 'song');
      numOfWritesLeft -= chunk[1];
      
      isClear = numOfWritesLeft === 0 
        ? songData.write(chunk[0], () => { calculateTime(start); })
        : songData.write(chunk[0]);
    }
    if(numOfWritesLeft > 0) {
      songData.once('drain', writeSongs);
    }
  }

  writeSongs();
};

songData.on('open', loadSongData);