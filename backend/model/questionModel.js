import mongoose from "mongoose";

// added a reference to the user, that posted the question
// added a like counter, which will increase or decrease
// when a user adds or removes his like about the question

// QUESTION SCHEMA************************************************************************************************************************
const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      minlength: 5, // Minimum length of the question: 5 characters
      maxlength: 1000, // Maximum length of the question: 1000 characters
      validate: {
        validator: (v) => {
          return v.length >= 5 && v.length <= 1000;
        },
        message:
          "The question must consist of at least 5 characters and no more than 1000 characters!",
      },
    },
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);
export default Question;
