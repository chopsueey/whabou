import mongoose from "mongoose";

const followSchema = new mongoose.Schema({
  followerProfileId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },

  //Target
  followingProfileId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
});

const FollowModel = mongoose.model('Follow', followSchema);
export default FollowModel;

