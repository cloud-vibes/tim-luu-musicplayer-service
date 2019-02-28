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
    id: Number,
    song_url: String
    artist_name: String,
    song_name: String,
    image: String, // image url
    hashtag: String, 
    time_elapsed: Date
    start_time: Number,
    song_length: Number,
    decibel: Number,
  }
  ```  
  2. POST - Route @ `song/:songId`
  ```
  Comment {
    id: Number,
    username: String,
    comment_image: String, // image url
    comment: String,
    song_id: Number
  }
  ```
  3. GET - Route @ `/song/:songId/api/song_id`
  ```
  [
    Song {
      id: Number,
      song_url: String
      artist_name: String,
      song_name: String,
      image: String, // image url
      hashtag: String, 
      time_elapsed: Date
      start_time: Number,
      song_length: Number,
      decibel: Number,
    }
  ]
  ```
  4. GET - Route @ `/song/:songId/api/song_img`
  ```
  [
    Song {
      image: String // image url
    }
  ]
  ```
  5. GET - Route @ `/song/:songId/api/song_url`
  ```
  [
    Song {
      song_url: String
    }
  ]
  ```
  6. GET - Route @ `/song/:songId/api/song_comment`
  ```
  [
    Comment {
      id: Number,
      username: String,
      comment_image: String, // image url
      comment: String,
      song_id: Number
    }
  ]
  ```
  7. GET - Route @ `/song/:songId/api/song_comment_img`
  ```
  [
    Comment {
      image: String, // image url
    }
  ]
  ```
  8. PUT - Route @ `/song/:songId`
  ```
  Song {
    id: Number,
    song_url: String
    artist_name: String,
    song_name: String,
    image: String, // image url
    hashtag: String, 
    time_elapsed: Date
    start_time: Number,
    song_length: Number,
    decibel: Number,
  }
  ```
  9. DELETE - Route @ `/song/:songId`
  ```
  Song {
    id: Number,
    song_url: String
    artist_name: String,
    song_name: String,
    image: String, // image url
    hashtag: String, 
    time_elapsed: Date
    start_time: Number,
    song_length: Number,
    decibel: Number,
  }
  ```


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

