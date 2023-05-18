const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../../../helper/fsShorts');

//get for notes from db.
notes.get('/', (req,res) => {
    readFromFile('../../../db/db.json').then((data) => res.json(JSON.parse(data)));
});

// grabs a note by their id
notes.get('/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    readFromFile('../../../db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((title) => title.note_id === noteId);
        return result.length > 0
          ? res.json(result)
          : res.json('There are no notes with that id');
      });
  });

  // delete route for a tip
  notes.delete('/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    readFromFile('../../../db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        //remakes the array with out the deleted one.
        const result = json.filter((title) => title.note_id !== noteId);
  
        // Save that array to the filesystem
        writeToFile('../../../db/db.json', result);
  
        // Respond to the DELETE request
        res.json(`Item ${tipId} has been deleted 🗑️`);
      });
  });

  notes.post('/', (req,res) => {
    console.log(req.body);
    const {title, text} = req.body;
    if (req.body) {
        const newNote = {
            title,
            text,
            note_id: uuidv4(),
        };
        readAndAppend(newNote, '../../../db/db.json');
        res.json('Note created');
    } else {
        res.errored("error, The shadow relm ate your note.");
    }
  });

  module.exports = notes;