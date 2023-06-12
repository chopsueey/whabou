import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  Frage: {
    type: String,
    required: true,
    minlength: 5, // Mindestlänge der Frage: 5 Zeichen
    maxlength: 1000 // Maximale Länge der Frage: 1000 Zeichen
  },
  Ja: { type: Number, default: 0 },
  Nein: { type: Number, default: 0 }
});

const Question = mongoose.model("Question", questionSchema);

export default Question;