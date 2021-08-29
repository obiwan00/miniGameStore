const express = require('express');
const gamesRouter = new express.Router();

const { asyncErrorHandle } = require('../utils/app.util');
const {
  getGames,
  getGameById,
} = require('../services/games.service');
const {
  validateGameIdMiddleware,
} = require('../middlewares/game.middleware');

gamesRouter.get('/', asyncErrorHandle(async (req, res) => {
  const { offset = '0', limit = '0', search = '', maxPrice = '-1', tags = [] } = req.query;

  // TODO: learn more about aggregation in mongoose and refactor a half of backend 😅
  const gamesByQueryParams = await getGames({
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

gamesRouter.get('/:_id', validateGameIdMiddleware, asyncErrorHandle(async (req, res) => {
  const userId = req.user._id;
  const gameId = req.params._id;
  res.json({ game: await getGameById({ userId, gameId }) });
}));

module.exports = {
  gamesRouter,
};
