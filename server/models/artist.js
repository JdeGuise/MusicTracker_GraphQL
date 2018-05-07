const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artistSchema = new Schema({
  name: String,
  genres: [String],
  description: String,
  url: String,
  instruments: [String],
  associatedActs: [String],
  activeYears: String
});

module.exports = mongoose.model("Artist", artistSchema);
