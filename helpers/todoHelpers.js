const knex = require("../knex/knex");

let db = {};

db.createTodo = async (title, description, user_id) => {
  const [id] = await knex("todos").insert({ title, description, user_id });
  return id;
};

db.getTodo = async (id) => {
  const [todo] = await knex("todos").where({ id });
  return todo;
};

db.updateTodo = async (id) => {
  await knex("todos").where({ id }).update({ completed: 1 });
};

db.deleteTodo = async (id) => {
  await knex("todos").where({ id }).del();
};

db.getTodosByUser = async (user_id) => {
  const todos = await knex("todos").join("users", "users.id", "todos.user_id").select().where({ user_id });
  return todos;
};

module.exports = db;
