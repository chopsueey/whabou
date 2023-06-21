import mongoose from "mongoose";


const obj = { minLength: [2, "Die mindestlänge beträgt 2 Zeichen!"], maxLength: [30, "Die maximale Länge beträgt 30 Zeichen!"] }

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    validate: {
      validator: (v) => {
         return v.length >= 2
      },
      message: "Der Name muss aus mindestens zwei Zeichen bestehen!",
    required: true,
    unique: true,
  },
  email: {
    type: String,
    validate:{
      validator:(v) => {
         return v.includes("@") && v.includes(".")
      },
      message: (props)=>`${props.value} ist keine gültige E-Mail!`
   },
    //required: true,
    //unique: true,
    // match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  password: {
    type: String,
    match: [/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,"Das Passwort muss aus Groß-und Kleinbuchstaben bestehen und mindestens eine Zahl enthalten!"]
   },
    //required: true,
    //minlength: 8,
    // Mindestlänge des Passworts
  },
});

const User = mongoose.model("User", userSchema);

export default User;
