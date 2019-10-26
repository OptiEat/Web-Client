/*
const express = require('express');
//const connectDB = require('./config/db');
const path = require('path');
const app = express();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect Database
// connectDB();

app.get('/test', (req, res) => res.send('Hello world!'));

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'web/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'web/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
*/

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: true, credentials: true }));

app.use(express.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));

// API calls
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

const queryAPI = require('./routes/api/query');
app.use('/api/query', queryAPI);

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'web/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'web/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
