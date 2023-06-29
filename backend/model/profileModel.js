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
    validate: {
      validator: (v) => {
        return this.enum.includes(v);
      },
      message: "Bitte machen Sie Angaben zu Ihrem Wohnort",
    },
  },
  birthyear: {
    type: Number,
    // required: true,
    min: 2011,
    validate: {
      validator: (v) => {
        return v.length >= 2011;
      },
      message: "Das Alter muss mindestens 12 sein!",
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
