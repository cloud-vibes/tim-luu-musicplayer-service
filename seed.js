const Sequelize = require('sequelize');
const faker = require('faker');
const { username, password } = require('./config.js');

const sequelize = new Sequelize('player', username, password, {
  host: 'localhost',
  //'cowiedatabase.c3ayie6lwpmv.us-east-1.rds.amazonaws.com'
  dialect: 'mysql',
});

const Song = sequelize.define('songplayer', {
  id: {
    type: Sequelize.INTEGER(11),
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  songname: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  artistname: {
    type: Sequelize.STRING(32),
    allowNull: false,
  },
  imgurl: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  hashtag: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  timeelapsed: {
    type: Sequelize.DATE(),
    allowNull: false,
  },
  starttime: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
  },
  songlength: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
  },
  decibel: {
    type: Sequelize.INTEGER(3),
    allowNull: false,
  },
  comment: {
    type: Sequelize.STRING(200),
    allowNull: false,
  },
  username: {
    type: Sequelize.STRING(32),
    allowNull: false,
  },
  songurl: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  commentimage: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
});


Song.sync({ force: true }).then(() => {
  const songs = [];
  for (let i = 1; i <= 100; i += 1) {
    const songMaker = Song.build({
      songname: faker.lorem.sentence(),
      artistname: faker.name.findName(),
      imgurl: `https://s3-us-west-1.amazonaws.com/songimages/photos/simg${i}.jpg`,
      hashtag: faker.random.word(),
      timeelapsed: faker.date.past(),
      starttime: 0,
      songlength: faker.random.number({ min: 120, max: 620 }),
      decibel: faker.random.number({ min: 62, max: 80 }),
      comment: faker.lorem.sentence(),
      username: faker.name.findName(),
      songurl: `https://s3.amazonaws.com/fredssong/Song${i}.mp3`,
      commentimage: `https://s3.amazonaws.com/commentimages/user${i}.jpg`,
    }).save();
    songs.push(songMaker);
  }
  return Promise.all(songs);
})
  .catch(err => console.log(err));

module.exports = {
  Song, sequelize,
};
