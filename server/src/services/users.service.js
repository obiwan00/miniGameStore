const User = require('../models/user.model');
const { validateUserCredentials } = require('./auth.service');
const { getEncryptedString } = require('./auth.service');

/**
 * Get user's portfolio by email
 * @param  {string} userId
 * @return {object}
 * */
async function getUserPortfolioById(userId) {
  const userDoc = await User.findById(userId);
  return {
    _id: userDoc._id,
    email: userDoc.email,
    username: userDoc.username,
    birthday: userDoc.birthday,
    createdAt: userDoc.createdAt,
  };
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
    userDoc,
    password: oldPassword,
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
  Object.entries(newFields).forEach(([key, value])=> {
    userDoc[key] = value;
  });
  await userDoc.save();
}

module.exports = {
  getUserPortfolioById,
  updateUserPassword,
  deleteUserById,
  editUserProfile,
};
