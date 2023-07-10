import Follow from "../model/followModel.js";
import User from "../model/followModel.js";
import Profile from "../model/profileModel.js";

export async function followUser(req, res, next) {
  try {
    const { followingProfileId } = req.body;

    const userId = req.user.userId;
    const requestProfile = await Profile.findOne({ userId: userId });
    const targetProfile = await Profile.findById(followingProfileId);

    if (requestProfile && targetProfile) {
      const createdFollow = await Follow({
        followerProfileId: requestProfile._id,
        followingProfileId: followingProfileId,
      });
      const savedFollow = await createdFollow.save();
      res.status(200).json({
        message: "User followed successfully",
        newFollow: savedFollow,
      });
    }
  } catch (error) {
    next(error);
  }
}

export async function deleteFollow(req, res, next) {
  try {
    const { followingProfileId } = req.body;
    const userId = req.user.userId;
    const requestProfile = await Profile.findOne({ userId: userId });
    const targetProfile = await Profile.findById(followingProfileId);

    if (requestProfile && targetProfile) {
      // follow to delete
      const followToDelete = await Follow.findOne({
        followerProfileId: requestProfile._id,
        followingProfileId: followingProfileId,
      });
      const deletedFollow = await Follow.findByIdAndDelete(followToDelete._id);

      res.status(200).json({ deletedFollow: deletedFollow });
    }
  } catch (error) {
    next(error);
  }
}

export async function getFollower(req, res, next) {
  try {
    const userId = req.user.userId;
    const profileId = req.params.profileId;

    const userProfileId = await Profile.findOne({
      userId: userId,
    });
    const followingThisProfile = await Follow.find({
      followingProfileId: profileId,
    });

    res.status(200).json({followingThisProfile, userProfileId});
  } catch (err) {
    next(err);
  }
}
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
