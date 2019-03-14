require('newrelic');
const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./db.js');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8081;

app.use(cors());
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use(bodyParser.json());

app.get('/api/musicplayer/bundle', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/dist/bundle.js'));
})

/*
 *
 * POST Requests
 * 
 */

app.post('/api/musicplayer', (req, res) => {
  let songInfo = req.body;
  console.log(req.body);
  db.addSong(songInfo)
    .then(() => {
      res.status(201).send();
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send();
    }) 
})

/*
 *
 * GET Requests
 * 
 */

app.get('/api/musicplayer/song/:songId/', (req, res) => {
  const { songId } = req.params;
  Promise.all([db.getSong(songId), db.getAllCommentsOfSong(songId)])
    .then((songInfo) => {
      let song = songInfo[0][0][0];
      let comments = songInfo[1][0];

      res.status(200).send({ song, comments });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
});

/*
 *
 * PUT Requests
 * 
 */

app.put('/api/musicplayer/song/:songId', (req, res) => { 
  db.updateSong(req.body, req.params.songId)
    .then(() => {
      console.log('Successfully updated.');
      res.status(200).send();
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send();
    });
})

/*
 *
 * DELETE Requests
 * 

 */

app.delete('/api/musicplayer/song/:songId', (req, res) => {
  db.deleteSong(req.params.songId)
    .then(() => {
      console.log('Successfully deleted.');
      res.status(200).send();
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send();
    })
})

////////////////////////////////////////////////////////////////////

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`NOW LISTENING ON PORT ${PORT}`);
});
