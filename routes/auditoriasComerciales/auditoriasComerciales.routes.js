const { Router } = require("express");
const {
  auditoriasComercialesController: controllers,
} = require("../../controllers");
const middlewares = require("./auditoriasComerciales.middlewares");

const router = Router();

router.get(`/yearly-resume`, middlewares.getResume, controllers.getResume);

router.get(
  `/monthly-resume`,
  middlewares.getMonthlyResume,
  controllers.getMonthlyResume,
);

module.exports = router;
