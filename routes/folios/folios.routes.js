const { Router } = require("express");
const { foliosController: controllers } = require("../../controllers");
const middlewares = require("./folios.middlewares");

const router = Router();

router.get(`/`, middlewares.getAll, controllers.getAll);

router.get(`/:id`, middlewares.getById, controllers.getById);

router.get(`/file/:id`, middlewares.getFileById, controllers.getFileById);

router.post(`/search/file`, [], controllers.search);

router.post(`/`, middlewares.create, controllers.create);

module.exports = router;
