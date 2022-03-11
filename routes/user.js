const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../auth/auth");

router.get("/logout", auth, userController.logout);

router.get("/:id", auth, userController.getOneById);

router.post("/", userController.createOneUser);

router.delete("/:id", auth, userController.deleteUserById);

router.put("/:id", auth, userController.updateOneUser);

router.post("/login", userController.login);

module.exports = router;
