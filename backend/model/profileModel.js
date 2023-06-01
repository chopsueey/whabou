import mongoose from "mongoose";
const ProfileSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  nationality: { type: String, required: true },
  age: { Number },
});
const Profile = mongoose.model("Profile", ProfileSchema);
export default Profile;
