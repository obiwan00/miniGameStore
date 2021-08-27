const {
  BadRequestError, AccessDeniedError,
} = require('../utils/errors');
const User = require('../models/user/user.model');
const { asyncErrorHandle } = require('../utils/app.util');
const {
  getFriendshipRecord,
} = require('../services/friends.service');


/**
 * Validate params for friendship request
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * */
async function friendBaseValidationMiddleware(req, res, next) {
  const userId = req.user._id;
  const friendId = req.params._id;
  if (userId === friendId) {
    throw new BadRequestError('Users id of friend should be different form current user id');
  }
  next();
}

/**
 * Validate params for friendship request
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * */
async function ifSuchFriendNOTExistThrowErrorMiddleware(req, res, next) {
  const friendId = req.params._id;
  // User has own middleware what throws Error if there is no such user
  await User.findById(friendId);
  next();
}


/**
 * If user has NOT such friend, then throw Error
 * @param {object?} obj
 * @param {string?} obj.requiredFriendStatus
 * @return {function}
 * */
function ifUserHasNOTSuchFriendThrowErrorMiddleware({ requiredFriendStatus } = {}) {
  return asyncErrorHandle(async (req, res, next) => {
    const userId = req.user._id;
    const friendId = req.params._id;

    const friendshipRecord = await getFriendshipRecord({ userId, friendId });

    if (!friendshipRecord) {
      throw new BadRequestError(`User doesn't have such id ${friendId} in his or her own friend list`);
    }

    if (!!requiredFriendStatus && friendshipRecord.status !== requiredFriendStatus) {
      throw new AccessDeniedError(
        `User can not edit friend status. Friend has status '${friendshipRecord.status}' ` +
        `instead of '${requiredFriendStatus}'`,
      );
    }

    req.friendshipRecords = req.friendshipRecords || {};
    req.friendshipRecords[friendId] = friendshipRecord;

    next();
  });
}

/**
 * If user has such friend, than throw Error
 * @return {function}
 * */
function ifUserHasSuchFriendThrowErrorMiddleware() {
  return asyncErrorHandle(async (req, res, next) => {
    const userId = req.user._id;
    const friendId = req.params._id;

    const friendshipRecord = await getFriendshipRecord({ userId, friendId });

    if (friendshipRecord) {
      throw new BadRequestError(`User should NOT have such id ${friendId} in his or her own friend list`);
    }

    req.friendshipRecords = req.friendshipRecords || {};
    req.friendshipRecords[friendId] = friendshipRecord;

    next();
  });
}

module.exports = {
  ifSuchFriendNOTExistThrowErrorMiddleware: asyncErrorHandle(ifSuchFriendNOTExistThrowErrorMiddleware),
  friendBaseValidationMiddleware: asyncErrorHandle(friendBaseValidationMiddleware),
  ifUserHasNOTSuchFriendThrowErrorMiddleware,
  ifUserHasSuchFriendThrowErrorMiddleware,
};
