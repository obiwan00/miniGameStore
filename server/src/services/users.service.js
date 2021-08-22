const User = require('../models/user.model');
const { validateUserCredentials } = require('./auth.service');
const {
  AccessDeniedError,
  BadRequestError,
} = require('../utils/errors');
const { getEncryptedString } = require('./auth.service');

/**
 * Get user portfolio by email
 * @param  {string} userEmail
 * @return {object}
 * */
async function getUserPortfolioByEmail(userEmail) {
  const user = await User.findOne({ email: userEmail });
  if (!user) {
    throw new AccessDeniedError('There is no such user. Register to the system');
  }
  return {
    _id: user._id,
    email: user.email,
    createDate: user.createDate,
  };
}

/**
 * Update user password
 * @param  {object} obj
 * @param {object} obj.userData
 * @param {string} obj.oldPassword
 * @param {string} obj.newPassword
 * */
async function updateUserPassword({ userData, oldPassword, newPassword }) {
  const userDoc = await User.findOne({ _id: userData._id });
  await validateUserCredentials({
    userDoc,
    password: oldPassword,
    errorMessage: 'Passed old password is incorrect',
  });
  userDoc.password = await getEncryptedString(newPassword);
  userDoc.save();
}


/**
 * Delete user account by Id
 * @param  {string} userEmail
 * @return {string} newPassword
 * */
async function deleteUserByEmail(userEmail) {
  const userToDelete = await User.findOne({ email: userEmail });
  if (!userToDelete) {
    throw new BadRequestError('There is no such user. Login to the system');
  }
  await userToDelete.remove();
}

module.exports = {
  getUserPortfolioByEmail,
  updateUserPassword,
  deleteUserByEmail,
};
