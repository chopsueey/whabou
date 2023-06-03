import mongoose from "mongoose";
const frageSchema = new mongoose.Schema({
  Frage: {
    type: String,
    required: true,
  },
  Ja: { type: Number, default: 0},
  Nein: {type: Number, default: 0}

});
const Frage = mongoose.model("Frage", frageSchema);
export default Frage;