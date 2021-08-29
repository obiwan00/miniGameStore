const express = require('express');
const libraryRouter = new express.Router();

const { asyncErrorHandle } = require('../utils/app.util');
const {
  getGamesFromLibrary,
  addGameToTheUserLibrary,
  removeGameFromTheUserLibrary,
} = require('../services/library.service');
const {
  validateGameIdMiddleware,
} = require('../middlewares/game.middleware');

libraryRouter.get('/', asyncErrorHandle(async (req, res) => {
  const { offset = '0', limit = '0', search = '', maxPrice = '-1', tags = [] } = req.query;

  const gamesByQueryParams = await getGamesFromLibrary({
    userId: req.user._id,
    offset: +offset,
    limit: +limit,
    maxPrice: +maxPrice,
    search,
    tags,
  });

  res.json({
    offset: +offset,
    limit: +limit,
    maxPrice: +maxPrice,
    search,
    tags,
    availableTags: gamesByQueryParams.availableTags,
    biggestPrice: gamesByQueryParams.biggestPrice,
    games: gamesByQueryParams.games,
    count: gamesByQueryParams.count,
  });
}));

libraryRouter.post('/:_id', validateGameIdMiddleware, asyncErrorHandle(async (req, res) => {
  const userId = req.user._id;
  const gameId = req.params._id;
  await addGameToTheUserLibrary({ userId, gameId });
  res.json({ message: `Success. Game with id ${gameId} was added to user's library` });
}));

libraryRouter.delete('/:_id', validateGameIdMiddleware, asyncErrorHandle(async (req, res) => {
  const userId = req.user._id;
  const gameId = req.params._id;
  await removeGameFromTheUserLibrary({ userId, gameId });
  res.json({ message: `Success. Game with id ${gameId} was deleted from user's library` });
}));

module.exports = {
  libraryRouter,
};
