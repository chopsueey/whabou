import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
    enum:["Frankreich", "Spanien", "England", "Deutschland", "Österreich", "Irland", "Norwegen", "Ägypten", 
   "Russland", "Türkei", "China", "Finnland", "Italien", "Kroatien", "Serbien", "Slowakei", "Griechenland",
  "Japan", "Bulgarien", "Bosnien-Herzegowina", "Liechtenstein", "Kanada", "USA", "Kongo",
  "Nigeria", "Marokko", "Other"],
  },
  age: {
    type: Number,
    required: true,
    min: 12,
  },
});

const Profile = mongoose.model("Profile", ProfileSchema);

export default Profile;
