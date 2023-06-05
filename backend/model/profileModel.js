import mongoose from "mongoose";

// added a reference to the user, the profile belongs to
const ProfileSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  nationality: { type: String, required: true },
  age: { Number },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
const Profile = mongoose.model("Profile", ProfileSchema);
export default Profile;
