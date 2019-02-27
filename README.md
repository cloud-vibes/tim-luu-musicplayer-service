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

  1. POST
    - Route @ `/song/api`
    ```
    Song {
      id: Number,
      image: String, // image url
      song_url: String
    }
    ```  
    - Route @ ```song/:songId```
    ```
      Comment {
        id: Number,
        image: String, // image url
        message: String,
        songId: Number
      }
    ```
  2. GET 
    - Route @ `/song/:songId/api/song_id`
    ```
    Song {
      id: Number
    }
    ```
    - Route @ `/song/:songId/api/song_img`
    ```
    Song {
      image: String // image url
    }
    ```
    - Route @ `/song/:songId/api/song_url`
    ```
    Song {
      song_url: String
    }
    ```
    - Route @ `/song/:songId/api/song_comment`
    ```
    Comment {
      id: Number,
      message: String,
      songId: Number
    }
    ```
    - Route @ `/song/:songId/api/song_comment_img`
    ```
    Comment {
      id: Number,
      image: String, // image url
      songId: Number
    }
    ```
    
  3. PUT
  ```sh
  npm install -g webpack
  npm install
  ```
  4. DELETE 
  ```sh
  npm install -g webpack
  npm install
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

