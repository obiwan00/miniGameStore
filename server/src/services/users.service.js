const User = require('../models/user/user.model');
const { pickFieldsFromObject } = require('../utils/app.util');
const { validateUserCredentials } = require('./auth.service');
const { getEncryptedString } = require('./auth.service');


const {
  FRIEND_PUBLIC_FIELDS,
  USER_PUBLIC_FIELDS,
  UNFAMILIAR_USER_PUBLIC_FIELDS,
} = require('../shared');


/**
 * Get user's portfolio by email
 * @param  {string} userId
 * @return {object}
 * */
async function getUserPortfolioById(userId) {
  const userDoc = await User.findById(userId);
  return pickFieldsFromObject({
    sourceObject: userDoc,
    fieldsToPick: USER_PUBLIC_FIELDS,
  });
}


/**
 * Delete user's account by email
 * @param  {string} userId
 * */
async function deleteUserById(userId) {
  const userDoc = await User.findById(userId);
  await userDoc.remove();
}


/**
 * Update user's password
 * @param  {object} obj
 * @param {object} obj.userData
 * @param {string} obj.oldPassword
 * @param {string} obj.newPassword
 * */
async function updateUserPassword({ userData, oldPassword, newPassword }) {
  const userDoc = await User.findById(userData._id);
  await validateUserCredentials({
    userPassword: userDoc.password,
    passwordToCheck: oldPassword,
    errorMessage: 'Passed old password is incorrect',
  });
  userDoc.password = await getEncryptedString(newPassword);
  userDoc.save();
}


/**
 * Patch user's by Id
 * @param {object} obj
 * @param {string} obj.userId
 * @param {object} obj.newFields
 * @param {string=} obj.newFields.birthday
 * @param {string=} obj.newFields.username
 * */
async function editUserProfile({ userId, newFields }) {
  const userDoc = await User.findById(userId);
  Object.entries(newFields).forEach(([key, value]) => {
    userDoc[key] = value;
  });
  await userDoc.save();
}


/**
 * Filter users according to query
 * @param {object[]} users
 * @param {object} params
 * @param {string} params.status
 * @param {object} params.search
 * @param {string} params.search.regExp
 * @param {string[]} params.search.fieldsToMatch
 * @return {object[]}
 * */
function filterUsers(users, { search, status }) {
  return users.filter((user) => {
    const searchMatchMap = search.fieldsToMatch.reduce((acc, filedName) => {
      acc[filedName] = !!user[filedName] ? !!user[filedName].match(search.regExp) : false;
      return acc;
    }, {});
    const searchMatch = !search || Object.entries(searchMatchMap).some(([key, value]) => value);

    const statusMatch = status === 'any' ? true : user.status === status;

    return searchMatch && statusMatch;
  });
}

/**
 * Get users according to query params
 * @param {object} query
 * @param {string} query.userId
 * @param {number} query.limit
 * @param {number} query.offset
 * @param {string} query.search
 * @return {object}
 * */
async function getUsers({ userId, limit, offset, search }) {
  const searchQuery = {
    '_id': { $ne: userId },
  };
  if (search) {
    searchQuery['username'] = { $regex: search, $options: 'gi' };
  }

  const users = await User.find(searchQuery)
    .limit(limit)
    .skip(offset);

  const formattedUsers = formatUsers({ userId, users });

  return {
    users: formattedUsers,
    count: await User.count(searchQuery),
  };
}

/**
 * Format friends to appropriate schema
 * @param {object} obj
 * @param {object[]} obj.userId
 * @param {string} obj.users
 * @return {object[]}
 * */
function formatUsers({ userId: currentUserId, users }) {
  return users.map((user) => {
    let fieldsToPick = UNFAMILIAR_USER_PUBLIC_FIELDS;

    const friendshipRecord = user.friends.find((friendshipRecord) => {
      return friendshipRecord._id.toString() === currentUserId;
    });

    if (friendshipRecord && friendshipRecord.status === 'accepted') {
      fieldsToPick = FRIEND_PUBLIC_FIELDS;
    }

    return {
      ...pickFieldsFromObject({
        sourceObject: user,
        fieldsToPick,
      }),
    };
  });
}

module.exports = {
  getUserPortfolioById,
  updateUserPassword,
  deleteUserById,
  editUserProfile,
  filterUsers,
  getUsers,
};
