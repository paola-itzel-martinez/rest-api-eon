const { check } = require("express-validator");
const { validateFields } = require("../../middlewares");

const getAll = [];

const create = [
  check("name", "name is required").not().isEmpty(),
  check("rfc", "rfc is required").not().isEmpty(),
  validateFields,
];

module.exports = {
  getAll,
  create,
};
