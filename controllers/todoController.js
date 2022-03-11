const db = require("../helpers/todoHelpers");

module.exports = {
  createNewTodo: async (req, res) => {
    const { title, description } = req.body;
    try {
      const id = await db.createTodo(title, description, req.user.id);
      const todo = await db.getTodo(id);
      res.status(201).json(todo);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  },

  getTodoById: async (req, res) => {
    const { id } = req.params;
    try {
      const todo = await db.getTodo(id);
      if (!todo) return res.status(404).json({ message: `no todo wih id=${id}` });
      res.status(200).json(todo);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  },

  // set completed to true
  updateCompleted: async (req, res) => {
    const { id } = req.params;
    try {
      const todo = await db.getTodo(id);
      if (req.user.id != todo.user_id) return res.status(403).json({ message: "This todo doesn't belong to you and you cannot update it!" });
      if (!todo) return res.status(404).json({ mesage: `no todo with id=${id}` });
      await db.updateTodo(id);
      const updatedTodo = await db.getTodo(id);
      res.status(200).json(updatedTodo);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  },

  deleteTodoById: async (req, res) => {
    const { id } = req.params;
    try {
      const todo = await db.getTodo(id);
      if (!todo) return res.status(404).json({ mesage: `no todo with id=${id}` });
      await db.deleteTodo(id);
      res.status(200).json({ message: `todo with id=${id} deleted` });
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  },

  getTodosByUserId: async (req, res) => {
    const { id } = req.params;
    try {
      const todos = await db.getTodosByUser(id);
      if (todos.length == 0) return res.json({ message: "this user doesn't have any todos yet" });
      res.json(todos);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  },
};
