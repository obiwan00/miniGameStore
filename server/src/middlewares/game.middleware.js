const {
  BadRequestError, AccessDeniedError,
} = require('../utils/errors');
const Game = require('../models/game/game.model');
const { asyncErrorHandle } = require('../utils/app.util');


/**
 * Validate params for friendship request
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * */
async function validateGameIdMiddleware(req, res, next) {
  const gameId = req.params._id;

  const gameDoc = await Game.findById(gameId);
  if (!gameDoc) {
    throw new BadRequestError(`There is no such Game with id ${gameId}`);
  }
  next();
}

module.exports = {
  validateGameIdMiddleware: asyncErrorHandle(validateGameIdMiddleware),
};
