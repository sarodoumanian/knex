const express = require("express");
const router = express.Router();
const auth = require("../auth/auth");

const todoControllers = require("../controllers/todoController");

router.post("/", auth, todoControllers.createNewTodo);

router.get("/allTodosByUser/:id", auth, todoControllers.getTodosByUserId);

router.get("/:id", auth, todoControllers.getTodoById);

router.put("/:id", auth, todoControllers.updateCompleted);

router.delete("/:id", auth, todoControllers.deleteTodoById);

module.exports = router;
