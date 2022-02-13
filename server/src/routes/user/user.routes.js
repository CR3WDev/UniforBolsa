const { Router } = require("express");
const routes = Router();
const userController = require("../../controllers/users.controller");

routes.get("/user", userController.get);

routes.get("/user/:id", userController.getById);

routes.post("/user", userController.post);

routes.put("/user/:id", userController.put);

routes.delete("/user/:id", userController.delete);

module.exports = routes;
