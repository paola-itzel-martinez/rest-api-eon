const { Router } = require("express");
const { otorganteController: controllers } = require("../../controllers");
const middlewares = require("./otorgantes.middlewares");

const router = Router();

router.get(`/`, middlewares.getAll, controllers.getAll);

router.post(`/`, middlewares.create, controllers.create);

router.put("/:id", middlewares.update, controllers.update);

router.delete("/:id", middlewares.delete, controllers.delete);

module.exports = router;
