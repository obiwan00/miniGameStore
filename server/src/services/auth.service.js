const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { AccessDeniedError } = require('../utils/errors');

/**
 * Register new user
 * @param {object} obj
 * @param {string} obj.role
 * @param {string} obj.email
 * @param {string} obj.password
 * */
async function registerUser({ email, password }) {
  const newUser = new User({
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
 * Check if user credentials are correct
 * @param {object} credentials
 * @param {object} credentials.userDoc -- await User.findOne('...')
 * @param {string} credentials.password
 * @param {string} [credentials.errorMessage]
 * @throws {AccessDeniedError} if user credentials are incorrect
 * */
async function validateUserCredentials({ userDoc, password, errorMessage = 'Incorrect email or password.' }) {
  if (!userDoc || !(await bcrypt.compare(password, userDoc.password))) {
    throw new AccessDeniedError(errorMessage);
  }
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


module.exports = {
  registerUser,
  getEncryptedString,
  validateUserCredentials,
  createJwtToken,
};
