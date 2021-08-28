const Game = require('../models/game/game.model');
const User = require('../models/user/user.model');
const {
  sliceElementsOfArray,
} = require('../utils/app.util');
const {
  getGames,
} = require('./games.service');

/**
 * Get games from library according to query params
 * @param {object} params
 * @param {number} params.limit
 * @param {number} params.offset
 * @param {string[]} params.tags
 * @param {string} params.search
 * @param {number} params.maxPrice
 * @return {object}
 * */
async function getGamesFromLibrary({ userId, limit, offset, search, tags, maxPrice }) {
  const userDoc = await User.findById(userId)
    .populate({
      path: 'library',
      populate: {
        path: 'tags',
        select: 'name',
      },
    })


  const filteredGames = filterGames(userDoc.library, {
    search: {
      regExp: new RegExp(search, 'gi'),
      fieldsToMatch: ['name'],
    },
    maxPrice,
    tags,
  });

  const paginationFilteredGames = sliceElementsOfArray({
    array: filteredGames,
    offset,
    limit,
  });

  const biggestPrice = filteredGames.reduce((acc, game) => acc < game.price ? game.price : acc, 0)

  const availableTags = filteredGames.reduce((acc, game) => {
    game.tags.forEach(tag => {
      console.log({ acc })
      acc.add(tag.name)
    })
    return acc;
  }, new Set());

  return {
    games: paginationFilteredGames,
    count: filteredGames.length,
    biggestPrice: biggestPrice,
    availableTags: [...availableTags],
  }
}

/**
 * Filter games according to query
 * @param {object[]} games
 * @param {object} params
 * @param {string[]} params.tags
 * @param {object} params.search
 * @param {number} params.maxPrice
 * @return {object[]}
 * */
function filterGames(games, { search, tags, maxPrice }) {
  return games.filter((game) => {
    const searchMatch = search.fieldsToMatch.some((filedName) => {
      return game[filedName].match(search.regExp)
    });

    const tagsMatch = tags.length !== 0 ? tags.every((searchTagName) => {
      return game.tags.find(({ name: gameTagName }) => gameTagName.toLowerCase() === searchTagName.toLowerCase())
    }) : true;

    const maxPriceMatch = maxPrice === -1 ? true : game.price <= maxPrice;

    return searchMatch && tagsMatch && maxPriceMatch;
  });
}

/**
 * @param {object} params
 * @param {string} params.userId
 * @param {string} params.gameId
 */
async function addGameToTheUserLibrary({ userId, gameId }) {
  await User.findOneAndUpdate(
    { _id: userId },
    { $addToSet: { library: gameId } },
  );
}

/**
 * @param {object} params
 * @param {string} params.userId
 * @param {string} params.gameId
 */
async function removeGameFromTheUserLibrary({ userId, gameId }) {
  await User.findOneAndUpdate(
    { _id: userId },
    { $pull: { library: gameId } },
  );
}

module.exports = {
  getGamesFromLibrary,
  addGameToTheUserLibrary,
  removeGameFromTheUserLibrary,
};
