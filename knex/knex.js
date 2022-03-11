const environment = process.env.ENVIRONMENT || "development";
const config = require("../knexfile.js")[environment];
const knex = require("knex")(config);

async function getUser(id) {
  const [user] = await knex("users").where({ id });
  return user;
}

async function createUser(username, password) {
  const [id] = await knex("users").insert({ username, password });
  return id;
}

async function deleteUser(id) {
  await knex("users").where({ id }).del();
}

async function updateUser(id, username, password) {
  if (username && password) {
    await knex("users").where({ id }).update({ username, password, updated_at: knex.fn.now() });
  } else if (username && !password) {
    await knex("users").where({ id }).update({ username, updated_at: knex.fn.now() });
  } else if (!username && password) {
    await knex("users").where({ id }).update({ password, updated_at: knex.fn.now() });
  }
}

module.exports = {
  getUser,
  createUser,
  deleteUser,
  updateUser,
};
