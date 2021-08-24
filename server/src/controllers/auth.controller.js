const express = require('express');
const authRouter = new express.Router();

const User = require('../models/user.model');
const { asyncErrorHandle } = require('../utils/app.util');
const {
  registerUser,
  createJwtToken,
  validateUserCredentials,
} = require('../services/auth.service');


authRouter.post('/register', asyncErrorHandle(async (req, res) => {
  const { email, password } = req.body;
  await registerUser({ email, password });
  res.send({ message: 'Profile created successfully' });
}));

authRouter.post('/login', asyncErrorHandle(async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  await validateUserCredentials({ userDoc, password });
  const jwtToken = await createJwtToken(userDoc);
  res.cookie('token', jwtToken, { httpOnly: true });
  res.send({ jwtToken: jwtToken });
}));

module.exports = {
  authRouter,
};
