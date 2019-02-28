const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./db.js');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8081;

app.use(cors());
app.use('/song/:songId', express.static(path.join(__dirname, '../client/dist')));
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use(bodyParser.json());

let tempDb = [];

/*
 *
 * POST Requests
 * 
 */

app.post('/song/api', (req, res) => {
  let songInfo = req.body;
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

app.get('/song/:songId/api/song_id', (req, res) => {
  const { songId } = req.params;
  db.getAllSongs(songId)
    .then((song) => {
      res.status(200).send(song);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.get('/song/:songId/api/song_img', (req, res) => {
  const { songId } = req.params;
  db.getSongImg(songId)
    .then((img) => {
      res.status(200).send(img);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.get('/song/:songId/api/song_url', (req, res) => {
  const { songId } = req.params;
  db.getSongUrl(songId)
    .then((img) => {
      res.status(200).send(img);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.get('/song/:songId/api/song_comment', (req, res) => {
  db.getAllComments()
    .then((song) => {
      res.status(200).send(song);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.get('/song/:songId/api/song_comment_img', (req, res) => {
  db.getSongCommentImgs()
    .then((img) => {
      res.status(200).send(img);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

/*
 *
 * PUT Requests
 * 
 */

app.put('/song/:songId', (req, res) => { 
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

app.delete('/song/:songId', (req, res) => {
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


app.listen(PORT, () => {
  console.log(`NOW LISTENING ON PORT ${PORT}`);
});
