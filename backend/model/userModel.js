import mongoose from "mongoose";

const obj = {
  minLength: [2, "The minimum length is 2 characters!"],
  maxLength: [30, "The maximum length is 30 characters!"],
};
// USER SCHEMA*************************************************************************************************************************
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => {
        return v.length >= 2;
      },
      message: "The name must consist of at least two characters!",
    },
  },

  email: {
    type: String,
    required: true,
    // unique: true,
    validate: {
      validator: (v) => {
        return v.includes("@") && v.includes(".");
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
    // match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },

  password: {
    type: String,
    required: true,
    match: [
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
      "The password must consist of upper and lower case letters and contain at least one number!",
    ],
  },
  //minlength: 8,
  //Minimum password length
});

const User = mongoose.model("User", userSchema);

export default User;
