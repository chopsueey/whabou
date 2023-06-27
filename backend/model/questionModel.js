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
      validate: {
        validator: (v) => {
          return v.length >= 5 && v.length <= 1000;
        },
        message:
          "Die Frage muss aus mindestens 5 Zeichen und nicht mehr als 1000 Zeichen bestehen!",
      },
    },
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);
export default Question;
