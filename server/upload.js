var csv = require('fast-csv');
var mongoose = require('mongoose');
var Artist = require('./models/artist');

exports.post = function (req, res) {
  if (!req.files){ return res.status(400).send('No files were uploaded.'); }
  var artistFile = req.files.file;
  var artists = [];

  csv.fromString(artistFile.data.toString(), {
    headers: true,
    ignoreEmpty: true
  }).on("data", function(data){
    artists.push(data);
    console.log(artists);
  }).on("end", function(){
    Artist.create(artists, function(err, documents) {
      console.log(documents);
      if (err){ throw err; }
    });
    res.send(artists.length + ' artists have been successfully uploaded.');
  });
};
