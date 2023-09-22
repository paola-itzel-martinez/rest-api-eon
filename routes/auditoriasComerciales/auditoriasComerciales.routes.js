const { Router } = require("express");
const {
  auditoriasComercialesController: controllers,
} = require("../../controllers");
const middlewares = require("./auditoriasComerciales.middlewares");

const router = Router();

router.get(`/`, middlewares.getResume, controllers.getResume);

module.exports = router;
