const express = require('express');
const usersRouter = new express.Router();

const { asyncErrorHandle } = require('../utils/app.util');
const {
  deleteUserByEmail,
  updateUserPassword,
  getUserPortfolioByEmail,
} = require('../services/users.service');


usersRouter.get('/me', asyncErrorHandle(async (req, res) => {
  res.send({ user: await getUserPortfolioByEmail(req.user.email) });
}));

usersRouter.delete('/me', asyncErrorHandle(async (req, res) => {
  await deleteUserByEmail(req.user.email);
  res.send({ message: 'Profile deleted successfully' });
}));

usersRouter.patch('/me/password', asyncErrorHandle(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  await updateUserPassword({ userData: req.user, oldPassword, newPassword });
  res.send({ message: 'Password changed successfully' });
}));

module.exports = {
  usersRouter,
};
