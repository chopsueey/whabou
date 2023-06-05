import mongoose from "mongoose";

// added a reference to the user, that posted the question
// added a like counter, which will increase or decrease
// when a user likes or removes his like on the question
const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Question = mongoose.model("Question", questionSchema);
export default Question;
