import UserModel from '../model/followModel.js';

async function followUser(req, res, next) {
  try {
    const { followerProfileId, followingProfileId } = req.body;
    
    const user = await UserModel.findById(followerProfileId);
    const targetUser = await UserModel.findById(followingProfileId);

    if (user && targetUser) {
      // Füge den followingProfileId zur Liste der Follower von followerProfileId hinzu
      user.following.push(followingProfileId);
      await user.save();

      // Füge followerProfileId zur Liste der Follower von followingProfileId hinzu
      targetUser.followers.push(followerProfileId);
      await targetUser.save();
    }

    res.status(200).json({ message: 'User followed successfully' });
  } catch (error) {
    next(error);
  }
}

async function unfollowUser(req, res, next) {
  try {
    const { followerProfileId, followingProfileId } = req.body;
    
    const user = await UserModel.findById(followerProfileId);
    const targetUser = await UserModel.findById(followingProfileId);

    if (user && targetUser) {
      // Entferne followingProfileId aus der Liste der Follower von followerProfileId
      user.following = user.following.filter((id) => id.toString() !== followingProfileId);
      await user.save();

      // Entferne followerProfileId aus der Liste der Follower von followingProfileId
      targetUser.followers = targetUser.followers.filter((id) => id.toString() !== followerProfileId);
      await targetUser.save();
    }

    res.status(200).json({ message: 'User unfollowed successfully' });
  } catch (error) {
    next(error);
  }
}

export {
  followUser,
  unfollowUser
};



/*
    async function followUser(req, res, next) {
      const { followerProfileId, followingProfileId } = req.body;
      const userModel = new UserModel();
    
    // Folge dem Benutzer mit followerProfileId dem Benutzer mit followingProfileId 
    const user = userModel.getUser(followerProfileId);
    const targetUser = userModel.getUser(followingProfileId);
  
    if (user && targetUser) {
      // Füge den followingProfileId zur Liste der Follower von followerProfileId hinzu
      user.following.push(followingProfileId);
      userModel.saveUser(user);
  
      // Füge followerProfileId zur Liste der Follower von followingProfileId hinzu
      targetUser.followers.push(followerProfileId);
      userModel.saveUser(targetUser);
    }
    next();
  }
  
    async function unfollowUser(req, res, next) {
      const { followerProfileId, followingProfileId } = req.body;
      const userModel = new UserModel();
    
    // Entfolge dem Benutzer mit followerProfileId dem Benutzer mit followingProfileId 
    const user = userModel.getUser(followerProfileId);
    const targetUser = userModel.getUser(followingProfileId);
  
    if (user && targetUser) {
      // Entferne followingProfileId aus der Liste der Follower von followerProfileId
      user.following = user.following.filter((id) => id !== followingProfileId);
      userModel.saveUser(user);
  
      // Entferne followerProfileId aus der Liste der Follower von followingProfileId
      targetUser.followers = targetUser.followers.filter((id) => id !== followerProfileId);
      userModel.saveUser(targetUser);
    }
    next();
  }
  
  export {
    followUser,
    unfollowUser
  };
  */
