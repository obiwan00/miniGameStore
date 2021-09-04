const Friend = require('../models/friend/friend.model');
const User = require('../models/user/user.model');
const {
  pickFieldsFromObject,
  sliceElementsOfArray,
} = require('../utils/app.util');
const {
  filterUsers,
} = require('./users.service');

const {
  FRIEND_PUBLIC_FIELDS,
  UNFAMILIAR_USER_PUBLIC_FIELDS,
} = require('../shared');

/**
 * Get friends
 * @param {object} obj
 * @param {string} obj.userId
 * @param {string} obj.friendId
 * @param {object} obj.friendshipRecord
 * @return {object}
 * */
async function getFriendById({ userId, friendId, friendshipRecord }) {
  const friendDoc = await User.findById(friendId);
  const status = friendshipRecord.status;

  if (!friendshipRecord) {
    friendshipRecord = await getFriendshipRecord({ userId, friendId });
  }

  let fieldsToPick = UNFAMILIAR_USER_PUBLIC_FIELDS;

  if (status && status === 'accepted') {
    fieldsToPick = FRIEND_PUBLIC_FIELDS;
  }

  return {
    friend: {
      ...pickFieldsFromObject({
        sourceObject: friendDoc,
        fieldsToPick,
      }),
      status,
    },
  };
}


/**
 * Get friends
 * @param {object} obj
 * @param {string} obj.userId
 * @param {string} obj.friendId
 * @return {object}
 * */
async function getFriendshipRecord({ userId, friendId }) {
  const userDoc = await User.findById(userId);
  return userDoc.friends.find((friend) => friend._id.toString() === friendId);
}


/**
 * Get users according to query params
 * @param {object} query
 * @param {string} query.userId
 * @param {number} query.limit
 * @param {number} query.offset
 * @param {string} query.status
 * @param {string} query.search
 * @return {object}
 * */
async function getFriends({ userId, limit, offset, status, search }) {
  const userDoc = await User.findById(userId)
    .populate({
      path: 'friends',
      populate: {
        path: '_id',
      },
    });

  const formattedFriends = formatFriends(userDoc.friends);

  const filteredFriends = filterUsers(formattedFriends, {
    status,
    search: {
      regExp: new RegExp(search, 'gi'),
      fieldsToMatch: ['username', 'email'],
    },
  });

  const paginationFilteredFriends = sliceElementsOfArray({
    array: filteredFriends,
    offset,
    limit,
  });

  return {
    friends: paginationFilteredFriends,
    count: userDoc.friends.length,
  };
}


/**
 * Format friends to appropriate schema
 * @param {object[]} friends
 * @return {object[]}
 * */
function formatFriends(friends) {
  return friends.map(({ _id, status }) => {
    let fieldsToPick = UNFAMILIAR_USER_PUBLIC_FIELDS;

    if (status) {
      if (status === 'accepted') {
        fieldsToPick = FRIEND_PUBLIC_FIELDS;
      }
      // Invert status of 'applied' for user to 'pending'.
      // Because friends were found in User model, and this record for friendship are correct for found user,
      // but not for current one.
      if (status === 'applied') {
        status = 'pending'
      }
    }

    return {
      ...pickFieldsFromObject({
        sourceObject: _id,
        fieldsToPick,
      }),
      status,
    };
  });
}


/**
 * Request friendship to other user with {id}
 * @param {object} obj
 * @param {string} obj.userId
 * @param {string} obj.friendId
 * */
async function requestFriendshipToUser({ userId, friendId }) {
  await Promise.all([
    await registerFriendshipForUser({ userId, friendId, status: 'pending' }),
    await registerFriendshipForUser({ userId: friendId, friendId: userId, status: 'applied' }),
  ]);
}


/**
 * Register new Friendship to users
 * @param {object} obj
 * @param {string} obj.userId
 * @param {string} obj.friendId
 * @param {string} obj.status
 * */
async function registerFriendshipForUser({ userId, friendId, status }) {
  await User.findOneAndUpdate(
    { _id: userId },
    {
      $addToSet: {
        friends: new Friend({
          _id: friendId,
          status,
        }),
      },
    },
  );
}


/**
 * Edit friendship status
 * @param {object} obj
 * @param {string} obj.userId
 * @param {string} obj.friendId
 * @param {string} obj.status
 * */
async function editFriendshipStatus({ userId, friendId, status }) {
  await User.findOneAndUpdate(
    { '_id': userId, 'friends._id': friendId },
    {
      $set: {
        'friends.$.status': status,
      },
    },
    { runValidators: true },
  );
}

/**
 * Accept friendship with user
 * @param {object} obj
 * @param {string} obj.userId
 * @param {string} obj.friendId
 * @param {string} obj.status
 * */
async function editFriendshipStatusForBothUsers({ userId, friendId, status }) {
  await Promise.all([
    await editFriendshipStatus({ userId, friendId, status }),
    await editFriendshipStatus({ userId: friendId, friendId: userId, status }),
  ]);
}


module.exports = {
  getFriendshipRecord,
  getFriendById,
  getFriends,
  requestFriendshipToUser,
  editFriendshipStatusForBothUsers,
};
