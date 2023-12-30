const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  form: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Form",
  },
  responses: [
    {
      question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Form.questions",
        required: true,
      },
      answer: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Response", responseSchema);
