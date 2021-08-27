const express = require('express');
const usersRouter = new express.Router();

const { asyncErrorHandle } = require('../utils/app.util');
const {
  deleteUserById,
  getUserPortfolioById,
  updateUserPassword,
  editUserProfile,
  getUsers,
} = require('../services/users.service');

usersRouter.get('/', asyncErrorHandle(async (req, res) => {
  const { offset = '0', limit = '0', search = '' } = req.query;

  const usersByQueryParams = await getUsers({
    userId: req.user._id,
    offset: +offset,
    limit: +limit,
    search: search,
  });

  res.json({
    offset: +offset,
    limit: +limit,
    search: search,
    users: usersByQueryParams.users,
    count: usersByQueryParams.count,
  });
}));

usersRouter.get('/me', asyncErrorHandle(async (req, res) => {
  res.send({ user: await getUserPortfolioById(req.user._id) });
}));

usersRouter.delete('/me', asyncErrorHandle(async (req, res) => {
  await deleteUserById(req.user._id);
  res.send({ message: 'Profile deleted successfully' });
}));

usersRouter.patch('/me', asyncErrorHandle(async (req, res) => {
  await editUserProfile({ userId: req.user._id, newFields: req.body });
  res.send({ message: 'Profile edited successfully' });
}));

usersRouter.patch('/me/password', asyncErrorHandle(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  await updateUserPassword({ userData: req.user, oldPassword, newPassword });
  res.send({ message: 'Password changed successfully' });
}));

module.exports = {
  usersRouter,
};
