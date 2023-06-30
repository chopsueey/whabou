import mongoose from "mongoose";


// LIKE SCHEMA *******************************************************************************************************************************
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

// VALIDATION TO SCHEMA***********************************************************************************************************************
likeSchema.pre("validate", async function (next) {
  // Validate the user field
  if (!this.user) {
    throw new Error("User field is required");
  }

  // VALIDATE THE QUESTION FIELD**************************************************************************************************************
  if (!this.question) {
    throw new Error("Question field is required");
  }

  next();
});

const Like = mongoose.model("Like", likeSchema);
export default Like;
