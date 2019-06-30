const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const songs = require('../database-mongo');
const port = process.env.PORT || 3004;

var app = express();

app.use(morgan('dev'))

app.use(express.static(__dirname + '/../react-client/dist'));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// client id created for Musicast
let my_client_id = '912029191f5f4b8381601e3fadd0adca';

// consider removing this and running it in the terminal
let my_client_secret = '6e6179d1041541e99b33694f2a3679f8';
let redirect_uri = `http://localhost:${port}`


//This will redirect to a specified uri, and will return a query string (parameters) that can be used... how?
// currently not being used
app.get('/login', function(req, res) {
  console.log('login route')
  // var scopes = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + my_client_id +
    // (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + encodeURIComponent(redirect_uri));
  });


app.get('/previousSongs', function (req, res) {
  songs.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.post('/saveSong', (req, res) => {
  songs.saveOne(req.body, (err, success) => {
    err ? console.log("Error saving song", err) : res.send('successfully saved song.')
  })
})

app.listen(port, function() {
  console.log(`listening on port ${port}!`);
});

