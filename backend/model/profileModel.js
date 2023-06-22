import mongoose from "mongoose";

// added a reference to the user, the profile belongs to

const ProfileSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },

  nationality: {
    type: String,
    // required: true,
    // enum: [
    //   "France",
    //   "Spain",
    //   "England",
    //   "Germany",
    //   "Austria",
    //   "Ireland",
    //   "Norway",
    //   "Egypt",
    //   "Russia",
    //   "Turkey",
    //   "China",
    //   "Finland",
    //   "Italy",
    //   "Croatia",
    //   "Serbia",
    //   "Slovakia",
    //   "Greece",
    //   "Japan",
    //   "Bulgaria",
    //   "Bosnia-Herzegovina",
    //   "Liechtenstein",
    //   "Canada",
    //   "USA",
    //   "Congo",
    //   "Nigeria",
    //   "Morocco",
    //   "Other",
    // ],
  },
  age: {
    type: Number,
    // required: true,
    min: 12,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Profile = mongoose.model("Profile", ProfileSchema);

export default Profile;
