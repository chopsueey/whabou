import mongoose from "mongoose";

// added a reference to the user, that posted the question
// added a like counter, which will increase or decrease
// when a user likes or removes his like on the question
const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      minlength: 5, // Mindestlänge der Frage: 5 Zeichen
      maxlength: 1000, // Maximale Länge der Frage: 1000 Zeichen
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
