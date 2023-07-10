import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  imgpub: String,
  country: { type: String, required: true },
  birthYear: { type: Number, required: true }
});

const profileModel = mongoose.model("profile", ProfileSchema);

export default profileModel;