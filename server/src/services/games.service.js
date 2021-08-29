const Game = require('../models/game/game.model');
const Tag = require('../models/tag/tag.model');
const User = require('../models/user/user.model');
const {
  pickFieldsFromObject,
} = require('../utils/app.util');

const {
  BadRequestError,
} = require('../utils/errors');

const {
  UNPAID_GAME_PUBLIC_FIELDS,
  PAYED_GAME_PUBLIC_FIELDS,
} = require('../shared/');


/**
 * Create game by applied props
 * @param {object} obj
 * @param {string} obj.name
 * @param {number} obj.price
 * @param {string} obj.description
 * @param {string} obj.downloadLink
 * @param {string} obj.shareLink
 * @param {string[]} obj.tags
 * */
async function createGame({ name, price, description, downloadLink, shareLink, tags }) {
  const newGame = new Game({
    name,
    price,
    description,
    downloadLink,
    shareLink,
    tags: await getTagsIdByStringArray(tags),
  });

  await newGame.save();
}

/**
 * Get tag ids by string. If such tags don't exist, it will create new ones
 * @param {string[]} tagNames
 * @return {string[]}
 * */
async function getTagsIdByStringArray(tagNames) {
  return await tagNames.reduce(async (acc, tagName) => {
    const tagId = await getTagIdByString(tagName);
    const newAcc = await acc;
    newAcc.push(tagId);
    return newAcc;
  }, Promise.resolve([]));
}

/**
 * Get tag id by string. If such tag doesn't exist, it will create new one
 * @param {string} tagName
 * @return {string[]}
 * */
async function getTagIdByString(tagName) {
  const tagId = await Tag.findOneAndUpdate(
    { name: tagName },
    { name: tagName },
    {
      new: true,
      upsert: true,
    },
  );

  return tagId._id;
}


/**
 * Get games according to query params
 * @param {object} query
 * @param {number} query.limit
 * @param {number} query.offset
 * @param {string[]} query.tags
 * @param {string} query.search
 * @param {number} query.maxPrice
 * @return {object}
 * */
async function getGames({ userId, limit, offset, search, tags, maxPrice }) {
  const searchQuery = await applyParamsForGameFilter({ search, tags, maxPrice });

  const games = await Game.find(searchQuery)
    .populate('tags', 'name')
    .limit(limit)
    .skip(offset);

  const formattedGames = await formatGames({ userId, games });

  const gamesMetaData = await Game.aggregate([
    { $match: searchQuery },
    {
      $lookup: {
        from: 'tags',
        localField: 'tags',
        foreignField: '_id',
        as: 'tags',
      }
    },
    { $unwind: '$tags' },
    {
      $group: {
        _id: null,
        biggestPrice: { $max: "$price" },
        availableTags: {
          $addToSet: '$tags.name',
        },
      }
    },
  ]);

  return {
    games: formattedGames,
    count: await Game.count(searchQuery),
    biggestPrice: gamesMetaData[0] ? gamesMetaData[0].biggestPrice : null,
    availableTags: gamesMetaData[0] ? gamesMetaData[0].availableTags : null,
  };
}

/**
 * Apply params to search query
 * @param {object} obj
 * @param {object?} obj.baseFilterObj
 * @param {string} obj.search
 * @param {string} obj.tags
 * @param {number} obj.maxPrice
 * @return {object[]}
 * */
async function applyParamsForGameFilter({ baseFilterQuery = {}, search, tags, maxPrice }) {

  if (search) {
    baseFilterQuery['name'] = { $regex: search, $options: 'gi' };
  }

  if (tags.length !== 0) {
    const tagsIdArray = await Tag.find({ name: { $in: tags } });
    baseFilterQuery['tags'] = { $all: tagsIdArray };
  }

  if (maxPrice !== -1) {
    baseFilterQuery['price'] = { $lte: maxPrice };
  }

  return baseFilterQuery;
}

/**
 * Format games to appropriate schema
 * @param {object} obj
 * @param {object[]} obj.userId
 * @param {string} obj.games
 * @return {object[]}
 * */
async function formatGames({ userId, games }) {
  const currentUserDoc = await User.findById(userId);
  return games.map((game) => {
    let fieldsToPick = UNPAID_GAME_PUBLIC_FIELDS;

    const hasCurrentUserSuchGame = currentUserDoc.library.some((gameId) => {
      return gameId.toString() === game._id.toString();
    });

    if (hasCurrentUserSuchGame) {
      fieldsToPick = PAYED_GAME_PUBLIC_FIELDS;
    }

    return pickFieldsFromObject({
      sourceObject: game,
      fieldsToPick,
    });
  });
}

/**
 * Format games to appropriate schema
 * @param {object} obj
 * @param {object[]} obj.userDoc
 * @param {string} obj.games
 * @return {object}
 * */
async function formatGame({ userDoc, game }) {
  let fieldsToPick = UNPAID_GAME_PUBLIC_FIELDS;

  const hasCurrentUserSuchGame = userDoc.library.some((gameId) => {
    return gameId.toString() === game._id.toString();
  });

  if (hasCurrentUserSuchGame) {
    fieldsToPick = PAYED_GAME_PUBLIC_FIELDS;
  }

  return pickFieldsFromObject({
    sourceObject: game,
    fieldsToPick,
  });
}


/**
 * Get games according to query params
 * @param {object} obj
 * @param {string} obj.userId
 * @param {string} obj.gameId
 * @return {object}
 * */
async function getGameById({ userId, gameId }) {
  const userDoc = await User.findById(userId)
  const gameDoc = await Game.findById(gameId)
    .populate('tags', 'name')

  return formatGame({ userDoc, game: gameDoc })
}

module.exports = {
  getGames,
  getGameById,
};
