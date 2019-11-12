const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
	name: String,
	genre: String,
	directorId: String,

	rate: Number,
	isWatched: Boolean,
});

module.exports = mongoose.model('Movie', movieSchema);
