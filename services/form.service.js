const Form = require("../models/form.model");

const create = async (params) => {
  const form = new Form(params);

  const createdForm = form.save();
  return createdForm;
};

const find = async () => {
  const forms = await Form.find();
  return forms;
};

const findById = async (id) => {
  const form = await Form.findById(id);
  return form;
};

exports.create = create;
exports.find = find;
exports.findById = findById;
