const { validationResult } = require("express-validator");
const { HTTP_STATUSES } = require("../constant");
const { ERROR_MESSAGES } = require("../messages");
const { create, find } = require("../services/form.service");

const createForm = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(HTTP_STATUSES.BAD_REQUEST)
        .json({ errors: errors.array() });
    }

    const form = req.body;
    const createdForm = await create(form);
    return res.status(HTTP_STATUSES.OK).json({ form: createdForm });
  } catch (err) {
    console.log(err);
    return res
      .status(HTTP_STATUSES.INTERNAL_SERVER_ERROR)
      .json({ err: ERROR_MESSAGES.SOMETHING_WENT_WRONG });
  }
};

const getForms = async (req, res) => {
  try {
    const forms = find();
    return res.status(HTTP_STATUSES.OK).json({ forms });
  } catch (err) {
    console.log(err);
    return res
      .status(HTTP_STATUSES.INTERNAL_SERVER_ERROR)
      .json({ err: ERROR_MESSAGES.SOMETHING_WENT_WRONG });
  }
};

exports.createForm = createForm;
exports.getForms = getForms;
