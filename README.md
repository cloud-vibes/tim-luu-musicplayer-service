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
  - Request contains:
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
  - Response sends:
    - If error, 400 Status Code
    - If success, 201 Status Code 
  
  2. GET - Route @ `/song/:songId/api/song_id`
  - Request contains:
    - N/A

  - Response sends:
    - If error, 400 Status Code
    - If success,
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
  - Request contains:
    - N/A

  - Response sends:
    - If error, 400 Status Code
    - If success,
  ```
  [
    Song {
      imgurl: String
    }
  ]
  ```
  
  4. GET - Route @ `/song/:songId/api/song_url`
  - Request contains:
    - N/A

  - Response sends:
    - If error, 400 Status Code
    - If success,
  ```
  [
    Song {
      songurl: String
    }
  ]
  ```
  
  5. GET - Route @ `/song/:songId/api/song_comment`
  - Request contains:
    -  N/A

  - Response sends:
    - If error, 400 Status Code
    - If success,
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
  - Request contains:
    - N/A

  - Response sends:
    - If error, 400 Status Code
    - If success,
  ```
  [
    Comment {
      imgurl: String
    }
  ]
  ```

  7. PUT - Route @ `/song/:songId`
  - Request contains:
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

  - Response sends:
    - If error, 400 Status Code
    - If success, 200 Status Code
  8. DELETE - Route @ `/song/:songId`
  - Request contains:
    - N/A

  - Response sends:
    - If error, 400 Status Code
    - If success, 200 Status Code


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

