const Sequelize = require('sequelize');
// const Seed = require('../seed.js');
const config = require('../config.js');


const sequelize = new Sequelize('cloudvibes', config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect
});

const User = sequelize.define('users', {
  id: { 
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  user_image: {
    type: Sequelize.TEXT
  }
})

const Song = sequelize.define('songs', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  artist_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  hashtag: {
    type: Sequelize.STRING(100),
  },
  time_elapsed: {
    type: Sequelize.DATE(),
    allowNull: false,
  },
  start_time: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  song_length: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  decibel: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  song_image: {
    type: Sequelize.TEXT,
  },
  song_url: {
    type: Sequelize.TEXT,
    allowNull: false,
  }
});
  
const Comment = sequelize.define('comments', {  
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  message: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  song_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
});

/*
 *
 * POST Queries
 * 
 */

const addSong = (songInfo) => {
  return sequelize.query(
    `INSERT INTO songs (title, artist_id, hashtag, time_elapsed, start_time, song_length, decibel, song_image, song_url) 
    VALUES ('${songInfo.title}', ${songInfo.artist_id}, '${songInfo.hashtag}', 
    '${songInfo.time_elapsed}', ${songInfo.start_time}, ${songInfo.song_length}, ${songInfo.decibel},
    '${songInfo.song_image}', '${songInfo.song_url}');`
  );
}

 /*
 *
 * GET Queries
 * 
 */

const getSong = (songId) => {
  return sequelize.query(
    `SELECT songs.title, users.username, songs.hashtag, songs.time_elapsed, songs.start_time, songs.song_length,
    songs.decibel, songs.song_url, songs.song_image FROM songs, users WHERE songs.id = ${songId} AND songs.artist_id = users.id;`
  );
}

const getAllCommentsOfSong = (songId) => {
  return sequelize.query(
    `SELECT users.username, users.user_image, comments.message FROM comments, users 
    WHERE comments.user_id = users.id AND comments.song_id = ${songId};`
  );
}

/*
 *
 * PUT Queries
 * 
 */

const updateSong = (songInfo, songId) => {
  return Song.update(songInfo, {
    where: {id: songId}
  });
}

/*
 *
 * DELETE Queries
 * 
 */
const deleteSong = (songId) => {
  return Song.destroy({
    where: {id: songId}
  })
}


module.exports = {
  addSong, 
  getSong,
  getAllCommentsOfSong,
  updateSong,
  deleteSong
};
