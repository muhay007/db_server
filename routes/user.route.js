const express = require("express");
const UserController = require("../controllers/user.controllers");
const UserRouter = express.Router();

UserRouter.get("/user-login", async (req, res) => {
  let response = await UserController.login(req.body);
  return res.status(response.status).send(response);
});

UserRouter.post("/user-signup", async (req, res) => {
  let response = await UserController.signup(req.body);
  return res.status(response.status).send(response);
});

module.exports = UserRouter;
