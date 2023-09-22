const { Router } = require("express");
const { consultasController: controllers } = require("../../controllers");
const middlewares = require("./consultas.middlewares");

const router = Router();

router.get(`/`, middlewares.getAll, controllers.getAll);

router.post(`/`, middlewares.create, controllers.create);

router.put("/:id", middlewares.update, controllers.update);

router.delete("/:id", middlewares.delete, controllers.delete);

module.exports = router;
