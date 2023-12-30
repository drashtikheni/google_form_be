const express = require("express");
const { body } = require("express-validator");
const formController = require("../controllers/form.controller");
const { FORM_MESSAGES } = require("../messages");
const { MIN_REQUIRED_QUESTIONS, ANSWER_TYPES_ENUM } = require("../constant");

const router = express.Router();

router.post(
  "/",
  [
    body("title").notEmpty().withMessage(FORM_MESSAGES.title),
    body("description").notEmpty().withMessage(FORM_MESSAGES.description),
    body("questions")
      .isArray({ min: MIN_REQUIRED_QUESTIONS })
      .withMessage(FORM_MESSAGES.oneQuestionRequired),
    body("questions.*.title")
      .notEmpty()
      .withMessage(FORM_MESSAGES.questionTitle),
    body("questions.*.type")
      .isIn(ANSWER_TYPES_ENUM)
      .withMessage(FORM_MESSAGES.questionType),
    body("questions.*").custom((value, { req }) => {
      if (
        value.type !== "text" &&
        (!value.options ||
          !Array.isArray(value.options) ||
          value.options.length < 1)
      ) {
        throw new Error(FORM_MESSAGES.optionsRequired);
      }
      return true;
    }),
  ],
  formController.createForm
);

router.get("/", formController.getForms);

module.exports = router;
