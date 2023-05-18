const fs = require('fs');
const util = require('util');

//  fs.readFile promis
const readFromFile = util.promisify(fs.readFile);
/**
 *  writes to json file wtih givin name and content
 *  @param {string} destination file name
 *  @param {object} content content you want sent
  * @returns {void} the shadow relm
 **/
// writes the things to the file
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );
/**
 *  reads data from file then adds to it
 *  @param {object} content the things to be added
 *  @param {string} file target file
 *  @returns {void} the shadow relm sequil.
 **/
// reads and pushes data using the two functions above.
const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

module.exports = { readFromFile, writeToFile, readAndAppend };