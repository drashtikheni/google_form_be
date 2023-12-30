const { HTTP_STATUSES } = require("../constant");
const { ERROR_MESSAGES } = require("../messages");

const errorHandler = (error, req, res, next) => {
  const statusCode = error.status || HTTP_STATUSES.INTERNAL_SERVER_ERROR;
  const err = error.message || ERROR_MESSAGES.SOMETHING_WENT_WRONG;

  return res.status(statusCode).json({ err });
};

exports.errorHandler = errorHandler;
