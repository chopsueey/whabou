import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  feedbackText: {
    type: String,
    required: true,
  },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;
