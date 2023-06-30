import mongoose from "mongoose";

// PROFILE SCHEMA*************************************************************************************************************************
// Added a reference to the user, the profile belongs to

const ProfileSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => {
        return v.length >= 2;
      },
      message: "The username must consist of at least two characters!",
    },
  },
  country: {
    type: String,
    // required: true,
    enum: [
      "France",
      "Spain",
      "England",
      "Germany",
      "Austria",
      "Ireland",
      "Norway",
      "Egypt",
      "Russia",
      "Turkey",
      "China",
      "Finland",
      "Italy",
      "Croatia",
      "Serbia",
      "Slovakia",
      "Greece",
      "Japan",
      "Bulgaria",
      "Bosnia-Herzegovina",
      "Liechtenstein",
      "Canada",
      "USA",
      "Congo",
      "Nigeria",
      "Morocco",
      "Other",
    ],
    validate: {
      validator: (v) => {
        return this.enum.includes(v);
      },
      message: "What is your country? Informaiton not provided",
    },
  },
  birthyear: {
    type: Number,
    // required: true,
    min: 2017,
    validate: {
      validator: (v) => {
        return v.length >= 2017;
      },
      message: "You shall be minimum 18 years old",
    },
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Profile = mongoose.model("Profile", ProfileSchema);

export default Profile;
