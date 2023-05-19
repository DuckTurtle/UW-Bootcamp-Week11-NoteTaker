const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helper/fsShorts');

//get for notes from db.
notes.get('/', (req,res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// grabs a note by their id
notes.get('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((note) => note.id === noteId);
        return result.length > 0
          ? res.json(result)
          : res.json('There are no notes with that id');
      });
  });

  // delete route for a note
  notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        //remakes the array with out the deleted one.
        const result = json.filter((note) => note.id !== noteId);
  
        // updates array.
        writeToFile('./db/db.json', result);
  
        // logs on sucess
        res.json(`${noteId} has been banished `);
      });
  });
// post notes;
  notes.post('/', (req,res) => {
    console.log(req.body);
    const {title, text} = req.body;
    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };
        readAndAppend(newNote, './db/db.json');
        res.json('Note created');
    } else {
        res.errored("error, The shadow relm ate your note.");
    }
  });

  module.exports = notes;