import mongoose from "mongoose";

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

// Add validation to the schema
//likeSchema.pre("validate", async function (next) {
  // Validate the user field
  //if (!this.user) {
    //throw new Error("User field is required");
  //}

  // Validate the question field
 // if (!this.question) {
   // throw new Error("Question field is required");
  //}

  //next();
//});

const Like = mongoose.model("Like", likeSchema);
export default Like;
