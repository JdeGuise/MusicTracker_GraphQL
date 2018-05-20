const mongoose = require('mongoose');
const artistSchema = new mongoose.Schema({
  name: String,
  genres: [String],
  description: String,
  url: String,
  instruments: [String],
  associatedActs: [String],
  activeYears: String
});

module.exports = mongoose.model("Artist", artistSchema);
