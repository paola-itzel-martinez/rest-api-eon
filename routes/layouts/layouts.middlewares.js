const { check } = require("express-validator");
const { validateFields } = require("../../middlewares");

const getLayouts = [
  check("otorgante", "otorgante is required").not().isEmpty(),
  check("year", "year is required").not().isEmpty(),
  validateFields,
];

module.exports = {
    getLayouts
};
