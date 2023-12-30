const AppError = require("../AppError");
const { HTTP_STATUSES, ANSWER_TYPES } = require("../constant");
const { ERROR_MESSAGES, FORM_MESSAGES } = require("../messages");
const Response = require("../models/response.model");
const { findById } = require("./form.service");
const {
  equal,
  isEmpty,
  length,
  string,
  checkIncludes,
  findInvalidAnswers,
  gt,
} = require("./javascript.service");

const create = async (params) => {
  const form = await findById(params.form);

  const invalidAnswers = findInvalidAnswers(form.questions, params.responses);
  if (gt(length(invalidAnswers)))
    throw new AppError(
      ERROR_MESSAGES.requiredFieldMissing,
      HTTP_STATUSES.BAD_REQUEST
    );

  const responses = [];
  for (let i = 0; i < length(form.questions); i++) {
    const question = form.questions[i];

    const currentQuestion = params.responses.find((response) =>
      equal(response.question, string(question._id))
    );

    if (currentQuestion) {
      if (
        (question.isRequired && isEmpty(currentQuestion.answer)) ||
        (!equal(question.type, ANSWER_TYPES.text) &&
          !checkIncludes(currentQuestion.answer, question.options))
      ) {
        throw new AppError(
          ERROR_MESSAGES.requiredFieldMissing,
          HTTP_STATUSES.BAD_REQUEST
        );
      } else {
        responses.push({
          question: question._id,
          answer: currentQuestion.answer,
        });
      }
    } else {
      throw new AppError(
        FORM_MESSAGES.invalidQuestionId,
        HTTP_STATUSES.BAD_REQUEST
      );
    }
  }

  params.responses = responses;

  const response = new Response(params);
  const createdResponse = response.save();
  return createdResponse;
};

const find = async () => {
  const responses = Response.find();
  return responses;
};

exports.create = create;
exports.find = find;
