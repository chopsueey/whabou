import mongoose from "mongoose";

const followSchema = new mongoose.Schema({
  followerProfileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
  },

  //Target
  followingProfileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
});

const Follow = mongoose.model("Follow", followSchema);

export default Follow;
