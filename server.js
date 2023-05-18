const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');
const api = require('./public/assets/js/index');

const PORT = process.env.PORT || 3001;

const app = express();

// imports  middleware
app.use(clog);

// middleware for json and urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

// get route for index.html
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// get route for notes 
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
