const { check } = require("express-validator");
const { isValidCategoryId } = require("../../helpers");
const { validateFields } = require("../../middlewares");

const getAll = [];

const create = [
  check("otorgante", "otorgante is required").not().isEmpty(),
  check("status", "status is required").not().isEmpty(),
  validateFields,
];

const update = [
  check("status", "status is required").not().isEmpty(),
  check("id").custom(isValidCategoryId),
  validateFields,
];

const deleteValue = [check("id").custom(isValidCategoryId), validateFields];

module.exports = {
  getAll,
  create,
  update,
  delete: deleteValue,
};
