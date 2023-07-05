import mongoose from "mongoose";

// added a reference to the user, the profile belongs to

let enums = {values: [
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
], message: "nationality went wrong"}

const ProfileSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => {
        return v.length >= 2;
      },
      message: "Der Username muss aus mindestens zwei Zeichen bestehen!",
    },
  },
  nationality: {
    type: String,
    // required: true,
    enum: enums,
  },
  age: {
    type: Number,
    // required: true,
    min: [2011, "Das Alter muss mindestens 18 sein!"]
  },
  birthYear: {
    type: Number,
    // required: true,
    max: 2005,
    validate: {
      validator: (v) => {
        return v.length >= 2005;
      },
      message: "Das Alter muss mindestens 18 sein!",
    },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Profile = mongoose.model("Profile", ProfileSchema);

export default Profile;
