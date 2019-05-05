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
  var newEntry = new Song({ 
    songName: data.name,
    artistName: data.artists[0].name,
    albumName: data.album.name
  })
  newEntry.save((err) => {
    if(err) {
      console.log('error saving data: ', err)
    }
  })
  
}

module.exports.selectAll = selectAll;
module.exports.saveOne = saveOne;
