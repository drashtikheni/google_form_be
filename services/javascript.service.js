const { default: mongoose } = require("mongoose");
const { OBJECT, STRING } = require("../constant");

const ternary = (bool, truthy, falsy) => (bool ? truthy : falsy);

const equal = (obj1, obj2) => obj1 === obj2;

const length = (obj) => obj?.length;

const notEmpty = (val) => {
  const regex = /[^\s]$/;
  return ternary(val, regex.test(val), false);
};

const lte = (param1, param2 = 0) => param1 <= param2;

const keys = (object) => (object ? Object.keys(object) : []);

const checkUndefined = (obj) => equal(obj, undefined);

const isEmptyString = (value) =>
  equal(value, "") || checkUndefined(value) || equal(value, null);

const typeOf = (val, type) => equal(typeof val, type);

const isEmpty = (value) => {
  if (typeOf(value, STRING) && isEmptyString(value)) return true;
  if (typeOf(value, OBJECT) && lte(length(keys(value)), 0)) return true;
  if (!value) return true;
  return false;
};

const string = (value = "") => value.toString();

const checkIncludes = (value, array) => array.includes(value);

const gt = (param1, param2 = 0) => param1 > param2;

const size = (obj) => obj?.size;

const findInvalidAnswers = (requiredArray, answerArray) => {
  const invalidAnswers = [];

  requiredArray.forEach((requiredItem) => {
    const matchingAnswer = answerArray.find((answerItem) => {
      return equal(string(requiredItem._id), answerItem.question);
    });

    if (
      requiredItem.isRequired &&
      (!matchingAnswer || !matchingAnswer.answer)
    ) {
      invalidAnswers.push({
        _id: requiredItem._id,
        isRequired: requiredItem.isRequired,
      });
    }
  });

  return invalidAnswers;
};

const isValidMongoId = (id) => mongoose.Types.ObjectId.isValid(id);

exports.ternary = ternary;
exports.equal = equal;
exports.length = length;
exports.notEmpty = notEmpty;
exports.lte = lte;
exports.keys = keys;
exports.isEmptyString = isEmptyString;
exports.isEmpty = isEmpty;
exports.checkUndefined = checkUndefined;
exports.string = string;
exports.typeOf = typeOf;
exports.checkIncludes = checkIncludes;
exports.findInvalidAnswers = findInvalidAnswers;
exports.gt = gt;
exports.size = size;
exports.isValidMongoId = isValidMongoId;
