const express = require('express');
const { asyncErrorHandle } = require('../utils/app.util');
const friendsRouter = new express.Router();
const {
  friendBaseValidationMiddleware,
  ifUserHasSuchFriendThrowErrorMiddleware,
  ifUserHasNOTSuchFriendThrowErrorMiddleware,
} = require('../middlewares/friend.middleware');

const {
  getFriends,
  requestFriendshipToUser,
  editFriendshipStatusForBothUsers,
  getFriendById,
} = require('../services/friends.service');

friendsRouter.get('/', asyncErrorHandle(async (req, res) => {
  const { offset = '0', limit = '0', search = '', status = 'any' } = req.query;

  const friendsByQueryParams = await getFriends({
    userId: req.user._id,
    offset: +offset,
    limit: +limit,
    search: search,
    status: status,
  });

  res.json({
    offset: +offset,
    limit: +limit,
    search: search,
    status: status,
    count: friendsByQueryParams.count,
    friends: friendsByQueryParams.friends,
  });
}));

friendsRouter.get(
  '/:_id',
  [
    friendBaseValidationMiddleware,
    ifUserHasNOTSuchFriendThrowErrorMiddleware(),
  ],
  asyncErrorHandle(async (req, res) => {
    const userId = req.user._id;
    const friendId = req.params._id;
    const friendshipRecord = req.friendshipRecords[friendId];
    res.send(await getFriendById({ userId, friendId, friendshipRecord }));
  }),
);

friendsRouter.post(
  '/:_id',
  [
    friendBaseValidationMiddleware,
    ifUserHasSuchFriendThrowErrorMiddleware(),
  ],
  asyncErrorHandle(async (req, res) => {
    await requestFriendshipToUser({ userId: req.user._id, friendId: req.params._id });
    res.send({ message: `Successfully requested friendship ot user with id ${req.params._id}` });
  }),
);

friendsRouter.patch(
  '/:_id/accept',
  [
    friendBaseValidationMiddleware,
    ifUserHasNOTSuchFriendThrowErrorMiddleware({ requiredFriendStatus: 'applied' }),
  ],
  asyncErrorHandle(async (req, res) => {
    await editFriendshipStatusForBothUsers({
      userId: req.user._id,
      friendId: req.params._id,
      status: 'accepted',
    });
    res.send({ message: `Friendship status was successfully updated to 'accepted'` });
  }),
);

friendsRouter.patch(
  '/:_id/reject',
  [
    friendBaseValidationMiddleware,
    ifUserHasNOTSuchFriendThrowErrorMiddleware({ requiredFriendStatus: 'applied' }),
  ],
  asyncErrorHandle(async (req, res) => {
    await editFriendshipStatusForBothUsers({
      userId: req.user._id,
      friendId: req.params._id,
      status: 'rejected',
    });
    res.send({ message: `Friendship status was successfully updated to 'rejected'` });
  }),
);

friendsRouter.delete(
  '/:_id',
  [
    friendBaseValidationMiddleware,
    ifUserHasNOTSuchFriendThrowErrorMiddleware(),
  ],
  asyncErrorHandle(async (req, res) => {
    await editFriendshipStatusForBothUsers({
      userId: req.user._id,
      friendId: req.params._id,
      status: 'deleted',
    });
    res.send({ message: `Friendship status was successfully updated to 'deleted'` });
  }),
);

module.exports = {
  friendsRouter,
};
