const { check } = require("express-validator");
const { validateFields } = require("../../middlewares");

const getResume = [
  check("otorgante", "otorgante is required").not().isEmpty(),
  check("year", "year is required").not().isEmpty(),
  validateFields,
];

const getMonthlyResume = [
  check("otorgante", "otorgante is required").not().isEmpty(),
  check("year", "year is required").not().isEmpty(),
  validateFields,
];

module.exports = {
  getResume,
  getMonthlyResume,
};
