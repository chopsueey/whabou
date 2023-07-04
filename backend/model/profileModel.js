import mongoose from "mongoose";

// added a reference to the user, the profile belongs to

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
  country: {
    type: String,
    // required: true,
    // let enums = {values: [
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
    // ], message: "choose a country"},
    validate: {
      validator: (v) => {
        return this.enum.includes(v);
      },
      message: "Bitte machen Sie Angaben zu Ihrem Wohnort",
    },
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
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Profile = mongoose.model("Profile", ProfileSchema);

export default Profile;
