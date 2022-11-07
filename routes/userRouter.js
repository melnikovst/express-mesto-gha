const userRouter = require('express').Router();
const {
  getProfiles, getProfile, updateProfile, updateAvatar, me, signout,
} = require('../controllers/user');
const { validateProfile, validateAvatar, validateIds } = require('../middlewares/error');

userRouter.get('/users/me', me);
userRouter.get('/signout', signout);
userRouter.get('/users', getProfiles);
userRouter.get('/users/:id', validateIds, getProfile);
userRouter.patch('/users/me', validateProfile, updateProfile);
userRouter.patch('/users/me/avatar', validateAvatar, updateAvatar);

module.exports = userRouter;
