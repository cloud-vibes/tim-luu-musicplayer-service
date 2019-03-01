const fs = require('fs');

/*
 *
 * PURPOSE: to write (or overwrite) a .CSV
 * file to be loaded into Postgres. Each CSV
 * will correspond to a column identifier inside
 * the table that the .CSV corresponds to.
 * 
 */


let data = 'title, artist\n';

for(let i = 0; i < 100; i++) {
  data += `title ${i}, artist ${i}\n`;
}


fs.writeFile('songs.csv', data, (err) => {
  if(err) {
    console.log(err);
    return;
  }
  console.log('There has been success.');
  return;
});