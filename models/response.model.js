const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  form: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Form",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  questions: [questionsSchema],
});

module.exports = mongoose.model("Response", responseSchema);
