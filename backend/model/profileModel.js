import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
    enum:["France", "Spain", "England", "Germany", "Austria", "Ireland", "Norway", "Egypt",
    "Russia", "Turkey", "China", "Finland", "Italy", "Croatia", "Serbia", "Slovakia", "Greece",
   "Japan", "Bulgaria", "Bosnia-Herzegovina", "Liechtenstein", "Canada", "USA", "Congo",
   "Nigeria", "Morocco", "Other"],
  },
  age: {
    type: Number,
    required: true,
    min: 12,
  },
});

const Profile = mongoose.model("Profile", ProfileSchema);

export default Profile;
