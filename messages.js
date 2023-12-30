const ERROR_MESSAGES = {
  SOMETHING_WENT_WRONG: "Something went wrong!",
  pathNotFound: "Path not found",
  requiredFieldMissing: "Please provide all required fields",
};

const FORM_MESSAGES = {
  title: "Title is required",
  description: "Description is required",
  oneQuestionRequired: "At least one question is required",
  questionTitle: "Title for each question is required",
  questionType:
    "Type for each question must be one from text, radio, checkbox or select",
  optionsRequired: "Options are required for non-text questions",
  invalidId: "Invalid Form Id",
  invalidQuestionId: "Invalid Question Id",
  answerRequired: "Answer is required",
  oneAnswerRequired: "At least one answer is required",
  uniqueOptions: "Each question should have unique options",
};

exports.ERROR_MESSAGES = ERROR_MESSAGES;
exports.FORM_MESSAGES = FORM_MESSAGES;
