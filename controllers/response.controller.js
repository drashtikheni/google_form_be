const { validationResult } = require("express-validator");
const { HTTP_STATUSES } = require("../constant");
const { create, formResponses } = require("../services/response.service");
const { isValidMongoId } = require("../services/javascript.service");
const AppError = require("../AppError");
const { ERROR_MESSAGES } = require("../messages");

const createResponse = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(HTTP_STATUSES.BAD_REQUEST)
        .json({ errors: errors.array() });
    }

    const formResponse = req.body;
    const createdFormResponse = await create(formResponse);
    return res
      .status(HTTP_STATUSES.CREATED)
      .json({ response: createdFormResponse });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getFormResponses = async (req, res, next) => {
  try {
    const { id: form } = req.params;

    const isValid = isValidMongoId(form);
    if (!isValid)
      throw new AppError(ERROR_MESSAGES.invalidId, HTTP_STATUSES.BAD_REQUEST);

    const responses = await formResponses(form);
    return res.status(HTTP_STATUSES.OK).json({ responses });
  } catch (err) {
    next(err);
  }
};

exports.createResponse = createResponse;
exports.getFormResponses = getFormResponses;
