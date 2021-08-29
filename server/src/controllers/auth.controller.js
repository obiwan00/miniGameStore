const express = require('express');
const authRouter = new express.Router();

const { asyncErrorHandle } = require('../utils/app.util');
const {
  registerUser,
  createJwtToken,
} = require('../services/auth.service');
const {
  validateCredentialsMiddleware,
} = require('../middlewares/authorization.middleware');


authRouter.post('/register', asyncErrorHandle(async (req, res) => {
  const { email, password, username } = req.body;
  await registerUser({ email, password, username });
  res.send({ message: 'Profile created successfully' });
}));

authRouter.post('/login', validateCredentialsMiddleware(), asyncErrorHandle(async (req, res) => {
  const jwtToken = await createJwtToken(req.userDoc);
  res.cookie('token', jwtToken, { httpOnly: true });
  res.send({ jwtToken: jwtToken });
}));

module.exports = {
  authRouter,
};
