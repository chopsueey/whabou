import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  Frage: {
    type: String,
    required: true,
  },
  Ja: { type: Number, default: 0},
  Nein: {type: Number, default: 0}

});
const Question = mongoose.model("Question", questionSchema);
export default Question;