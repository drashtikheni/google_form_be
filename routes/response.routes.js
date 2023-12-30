const express = require("express");
const { body } = require("express-validator");
const responseController = require("../controllers/response.controller");
const { FORM_MESSAGES } = require("../messages");
const { MIN_REQUIRED_QUESTIONS, ANSWER_TYPES_ENUM } = require("../constant");
const { length, equal } = require("../services/javascript.service");
const AppError = require("../AppError");

const router = express.Router();

router.post(
  "/",
  [
    body("form").isMongoId().withMessage(FORM_MESSAGES.invalidId),
    body("responses")
      .isArray({ min: MIN_REQUIRED_QUESTIONS })
      .withMessage(FORM_MESSAGES.oneAnswerRequired),
    body("responses.*.question")
      .isMongoId()
      .withMessage(FORM_MESSAGES.invalidQuestionId),
    body("responses")
      .custom((value) => {
        const questions = value.map((response) => response.question);

        const uniqueQuestions = [...new Set(questions)];
        if (!equal(length(questions), length(uniqueQuestions))) {
          throw new AppError(
            FORM_MESSAGES.uniqueQuestions,
            HTTP_STATUSES.BAD_REQUEST
          );
        }

        return true;
      })
      .withMessage(FORM_MESSAGES.uniqueQuestions),
  ],
  responseController.createResponse
);

router.get("/:id", responseController.getFormResponses);

module.exports = router;
