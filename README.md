# Project Name

> Project description

## Related Projects

  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)
3. [Development](#development)

## Usage

npm install
npm run seeding
npm run react-dev
npm run server

### CRUD Operations

  1. POST - Route @ `/song/api`
  ```
  Song {
    songname: String,
    artistname: String,
    imgurl: String,
    hashtag: String, 
    timeelapsed: Date
    starttime: Number,
    songlength: Number,
    decibel: Number,
    comment: String,
    username: String,
    songurl: String,
    commentimage: String
  }
  ```
  2. GET - Route @ `/song/:songId/api/song_id`
  ```
  [
    Song {
      id: Number,
      songname: String,
      artistname: String,
      imgurl: String,
      hashtag: String, 
      timeelapsed: Date
      starttime: Number,
      songlength: Number,
      decibel: Number,
      comment: String,
      username: String,
      songurl: String,
      commentimage: String
    }
  ]
  ```
  3. GET - Route @ `/song/:songId/api/song_img`
  ```
  [
    Song {
      imgurl: String
    }
  ]
  ```
  4. GET - Route @ `/song/:songId/api/song_url`
  ```
  [
    Song {
      songurl: String
    }
  ]
  ```
  5. GET - Route @ `/song/:songId/api/song_comment`
  ```
  [
    Song {
      id: Number,
      comment: String,
      username: String,
      commentimage: String
    }
  ]
  ```
  6. GET - Route @ `/song/:songId/api/song_comment_img`
  ```
  [
    Comment {
      imgurl: String
    }
  ]
  ```
  7. PUT - Route @ `/song/:songId`
  ```
  Song {
    songname: String,
    artistname: String,
    imgurl: String,
    hashtag: String, 
    timeelapsed: Date,
    starttime: Number,
    songlength: Number,
    decibel: Number,
    comment: String,
    username: String,
    songurl: String,
    commentimage: String
  }
  ```
  8. DELETE - Route @ `/song/:songId`


## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

  - Node 6.13.0
  - etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

