const knex = require("../knex/knex");

let db = {};

db.getUser = async (id) => {
  const [user] = await knex("users").where({ id });
  return user;
};

db.createUser = async (username, password) => {
  const [id] = await knex("users").insert({ username, password });
  return id;
};

db.deleteUser = async (id) => {
  await knex("users").where({ id }).del();
};

db.updateUser = async (id, username, password) => {
  if (username && password) {
    await knex("users").where({ id }).update({ username, password, updated_at: knex.fn.now() });
  }
  if (username && !password) {
    await knex("users").where({ id }).update({ username, updated_at: knex.fn.now() });
  }
  if (!username && password) {
    await knex("users").where({ id }).update({ password, updated_at: knex.fn.now() });
  }
};

db.findUserByUsername = async (username) => {
  const [user] = await knex("users").where({ username });
  return user;
};

module.exports = db;
