const Response = require("../models/response.model");

const create = async (params) => {
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
