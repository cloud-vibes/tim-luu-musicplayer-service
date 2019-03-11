'use strict';

module.exports = {
  generateSongId,
  generateSong
};

function generateSongId(userContext, events, done) {
  // generate data with Faker:
  // add variables to virtual user's context:
  function getRandomInt(range) {
    return 1 + Math.floor(Math.random() * Math.floor(range));
  };
  let songId = getRandomInt(10000000);
  userContext.vars.songId = songId;
  // continue with executing the scenario:
  return done();
}

function generateSong(userContext, events, done) {
    userContext.vars.title = "a really good sounding sound";
    userContext.vars.artist_id = 1;
    userContext.vars.hashtag = "certified hella dopey";
    userContext.vars.time_elapsed = "2011-10-05T14:48:00.000Z";
    userContext.vars.start_time = 0;
    userContext.vars.song_length = 500;
    userContext.vars.decibel = 100;
    userContext.vars.song_image = "some image";
    userContext.vars.song_url = "some url";

    return done();
}