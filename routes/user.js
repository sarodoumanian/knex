const express = require("express");
const router = express.Router();
const { getUser, createUser, deleteUser, updateUser } = require("../knex/knex");

router.post("/user", async (req, res) => {
  const { username, password } = req.body;
  try {
    const id = await createUser(username, password);
    const newUser = await getUser(id);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

router.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUser(id);
    if (!user) return res.status(404).json({ message: "no user" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

router.delete("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUser(id);
    if (!user) return res.status(404).json({ message: `no user with id=${id}` });
    await deleteUser(id);
    res.status(200).json({ message: `user with id=${id} deleted!` });
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

router.put("/user/:id", async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;
  if (!username && !password) return res.status(400).json({ message: "username or password should be provided" });
  try {
    await updateUser(id, username, password);
    const user = await getUser(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

module.exports = router;
