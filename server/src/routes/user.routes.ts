import { Router } from "express";
const userController = require("../controllers/user.controller");

const routes = Router();

routes.get("/user", userController.get);

routes.get("/user/:id", userController.getById);

routes.post("/user", userController.post);

routes.put("/user", userController.put);

routes.delete("/user/:id", userController.delete);

module.exports = routes;
