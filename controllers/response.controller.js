const { validationResult } = require("express-validator");
const { HTTP_STATUSES } = require("../constant");
const { create } = require("../services/response.service");

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

const getFormResponses = async () => {};

exports.createResponse = createResponse;
exports.getFormResponses = getFormResponses;
