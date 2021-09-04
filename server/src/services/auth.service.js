const User = require('../models/user/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  AccessDeniedError,
} = require('../utils/errors');


/**
 * Register new user
 * @param {object} obj
 * @param {string} obj.role
 * @param {string} obj.email
 * @param {string} obj.password
 * @param {string} obj.username
 * */
async function registerUser({ email, password, username }) {
  const newUser = new User({
    username,
    email,
    password: await getEncryptedString(password),
  });
  await newUser.save();
}

/**
 * Encrypt passed string and return it
 * @param {string} stringToEncrypt
 * @param {number} saltRounds
 * @return {string}
 * */
async function getEncryptedString(stringToEncrypt, saltRounds = 10) {
  return await bcrypt.hash(stringToEncrypt, saltRounds);
}


/**
 * Create and get Jwt token
 * @param {object} userDoc
 * @return {string}
 * */
async function createJwtToken(userDoc) {
  const payload = {
    _id: userDoc._id,
    email: userDoc.email,
    role: userDoc.role,
  };
  return jwt.sign(payload, process.env.JWT_SECRET);
}

/**
 * Check if user credentials are correct
 * @param {object} credentials
 * @param {object} credentials.userPassword
 * @param {string} credentials.passwordToCheck
 * @param {string} [credentials.errorMessage]
 * @throws {AccessDeniedError} if user credentials are incorrect
 * */
async function validateUserCredentials({ userPassword, passwordToCheck, errorMessage = 'Incorrect email or password.' }) {
  if (! await bcrypt.compare(passwordToCheck, userPassword)) {
    throw new AccessDeniedError(errorMessage);
  }
}


module.exports = {
  registerUser,
  getEncryptedString,
  createJwtToken,
  validateUserCredentials,
};
