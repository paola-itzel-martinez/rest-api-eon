const { Router } = require("express");
const { clientsController: controllers } = require("../../controllers");
const middlewares = require("./clients.middlewares");

const router = Router();

router.get(`/`, middlewares.getAll, controllers.getAll);

router.post(`/`, middlewares.create, controllers.create);

module.exports = router;
