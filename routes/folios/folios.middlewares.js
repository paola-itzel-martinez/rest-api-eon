const { check } = require("express-validator");
const { validateFields } = require("../../middlewares");

const getAll = [];

const getById = [check("id", "id is required").not().isEmpty(), validateFields];

const getFileById = [
  check("id", "id is required").not().isEmpty(),
  validateFields,
];

const create = [
  check("client", "client is required").not().isEmpty(),
  check("consulta", "consulta is required").not().isEmpty(),
  check("user", "user is required").not().isEmpty(),
  validateFields,
];

const searchData = [];

module.exports = {
  getAll,
  getById,
  getFileById,
  create,
  search: searchData,
};
