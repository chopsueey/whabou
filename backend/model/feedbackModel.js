import mongoose from "mongoose";

// FEEDBACK SCHEMA*************************************************************************************************************************

const feedbackSchema = new mongoose.Schema({
  feedbackText: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        return v.length >= 5 && v.length <= 1000;
      },
      message:
        "The feedback must consist of at least 5 characters and no more than 1000 characters!",
    },
  },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;
