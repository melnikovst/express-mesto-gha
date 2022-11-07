const userRouter = require('express').Router();
const {
  getProfiles, getProfile, updateProfile, updateAvatar, me,
} = require('../controllers/user');
const { validateProfile, validateAvatar, validateIds } = require('../middlewares/error');

userRouter.get('/users/me', me);
userRouter.get('/users', getProfiles);
userRouter.get('/users/:id', validateIds, getProfile);
userRouter.patch('/users/me', validateProfile, updateProfile);
userRouter.patch('/users/me/avatar', validateAvatar, updateAvatar);

module.exports = userRouter;
