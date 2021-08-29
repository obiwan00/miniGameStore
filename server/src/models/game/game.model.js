const mongoose = require('mongoose');
const GameSchema = require('./game.schema');

const Game = mongoose.model('Game', GameSchema);

module.exports = Game;
