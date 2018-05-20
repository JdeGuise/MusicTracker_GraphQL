const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const albumSchema = new Schema({
  name: String,
  releaseYear: Number,
  artistId: String,
});

module.exports = mongoose.model("Album", albumSchema);
