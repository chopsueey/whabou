import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  feedbackText: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        return v.length >= 5 && v.length <= 1000;
      },
      message:
        "Das Feedback muss aus mindestens 5 Zeichen und nicht mehr als 1000 Zeichen bestehen!",
    },
  },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;
