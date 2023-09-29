const { Router } = require("express");
const {
  layoutsController: controllers,
} = require("../../controllers");
const middlewares = require("./layouts.middlewares");

const router = Router();

router.post(`/`, middlewares.getLayouts, controllers.getLayouts);

module.exports = router;
