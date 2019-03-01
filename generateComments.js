const fs = require('fs');
const faker = require('faker');




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
    let songUrl = urls[0];
    let songImage = urls[0];
    
    data += `${title},${artist},${hashtag},${timeElapsed},${startTime},${songLength},${decibel},${songUrl},${songImage}\n`;
  }

  return [data, n];
}