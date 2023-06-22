import mongoose from "mongoose";

const obj = {
  minLength: [2, "Die mindestlänge beträgt 2 Zeichen!"],
  maxLength: [30, "Die maximale Länge beträgt 30 Zeichen!"],
};

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        return v.length >= 2;
      },
      message: "Der Name muss aus mindestens zwei Zeichen bestehen!",
    },
  },

  // userName: {
  //   type: String,
  //   required: true,
  //   unique: true,
  //   validate: {
  //     validator: (v) => {
  //       return v.length >= 2;
  //     },
  //     message: "Der Username muss aus mindestens zwei Zeichen bestehen!",
  //   },
  // },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => {
        return v.includes("@") && v.includes(".");
      },
      message: (props) => `${props.value} ist keine gültige E-Mail!`,
    },
    // match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },

  password: {
    type: String,
    required: true,
    match: [
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
      "Das Passwort muss aus Groß-und Kleinbuchstaben bestehen und mindestens eine Zahl enthalten!",
    ],
  },
  //minlength: 8,
  // Mindestlänge des Passworts
});

const User = mongoose.model("User", userSchema);

export default User;
