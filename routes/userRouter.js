const userRouter = require('express').Router();
const {
  getProfiles, postProfile, getProfile, updateProfile, updateAvatar,
} = require('../controllers/user');

userRouter.get('/users', getProfiles);

userRouter.post('/users', postProfile);

userRouter.get('/users/:id', getProfile);

userRouter.patch('/users/me', updateProfile);

userRouter.patch('/users/me/avatar', updateAvatar);

module.exports = userRouter;
