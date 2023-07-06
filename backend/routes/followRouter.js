const express = require('express');
const UserController = require('./userController');

const userRouter = express.Router();
const userController = new UserController();

// Route zum Folgen eines Benutzers
userRouter.post('/follow', (req, res) => {
  const { userId, targetUserId } = req.body;
  userController.followUser(userId, targetUserId);
  res.send('Follower hinzugefügt');
});

// Route zum Entfolgen eines Benutzers
userRouter.post('/unfollow', (req, res) => {
  const { userId, targetUserId } = req.body;
  userController.unfollowUser(userId, targetUserId);
  res.send('Follower entfernt');
});

module.exports = userRouter;
