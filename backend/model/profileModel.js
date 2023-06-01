import mongoose from "mongoose";
const ProfileSchema = new mongoose.Schema({
    userName: {
      type: String,
      required: true
    },
    age: {Number,
    },
    nationality: {String,
      required: true
    },
  });
const Profile= mongoose.model('Profile', ProfileSchema)
  export default Profile ;