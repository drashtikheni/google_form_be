const HTTP_STATUSES = {
    INTERNAL_SERVER_ERROR: 500,
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404
}

const MIN_REQUIRED_QUESTIONS = 1

const ANSWER_TYPES_ENUM = ["text", "radio", "checkbox", "select"]

exports.HTTP_STATUSES = HTTP_STATUSES
exports.MIN_REQUIRED_QUESTIONS = MIN_REQUIRED_QUESTIONS
exports.ANSWER_TYPES_ENUM = ANSWER_TYPES_ENUM