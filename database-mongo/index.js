var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Songs');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var songSchema = mongoose.Schema({
  songName: String,
  artistName: String,
  albumName: String,
  albumImg: String,
});

var Song = mongoose.model('Song', songSchema);

var selectAll = function(callback) {
  Song.find({}, function(err, songs) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, songs);
    }
  });
};

var saveOne = function(data, callback) {
  let songObj = { 
    songName: data.name,
    artistName: data.artists[0].name,
    albumName: data.album.name,
    albumImg: data.album.images[2].url,
  } 
  
  var newEntry = new Song( songObj)
  
  Song.findOne(songObj, (err, response) => {
    if (err) {
      console.log('error finding one: ', err)
    } else {
      if (!response) {
        newEntry.save((err) => {
          if (err) {
            console.log('error saving data: ', err)
          } else {
            console.log('song data saved');
            callback()
          }
        });
      } else {
        console.log(`${data.name} by ${data.artists[0].name} is already saved!`)
      }
    }
  }) 
}

module.exports = { selectAll, saveOne }
