const authController = require("./auth.controller");
const categoriesController = require("./categories.controller");
const consultaEstatusesController = require("./consultaEstatuses.controller");
const consultasController = require("./consultas.controller");
const productsController = require("./products.controller");
const searchController = require("./search.controller");
const otorganteController = require("./otorgante.controller");
const uploadController = require("./upload.controller");
const usersController = require("./users.controller");

const auditoriasComercialesController = require("./auditoriasComerciales");
const clientsController = require("./clients");
const foliosController = require("./folios");

module.exports = {
  authController,
  categoriesController,
  consultaEstatusesController,
  consultasController,
  productsController,
  searchController,
  otorganteController,
  uploadController,
  usersController,
  auditoriasComercialesController,
  clientsController,
  foliosController,
};
