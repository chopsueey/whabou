import mongoose from "mongoose";

// a Like Schema, that stores the id of the question
// that was being liked and the id of the user,
// who liked the question
const likeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
});

const Like = mongoose.model("Like", likeSchema);
export default Like;
