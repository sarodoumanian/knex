const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../helpers/userHelpers");

module.exports = {
  getOneById: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await db.getUser(id);
      if (!user) return res.status(404).json({ message: "no user" });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  },

  createOneUser: async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await db.findUserByUsername(username);
      if (user) return res.status(400).json({ message: "This username already exists try something else" });
      const hashedPassword = await bcrypt.hash(password, 8);
      const id = await db.createUser(username, hashedPassword);
      const newUser = await db.getUser(id);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  },

  deleteUserById: async (req, res) => {
    const { id } = req.params;
    try {
      if (req.user.id != id) return res.status(403).json({ message: "This account doesn't belong to you and you cannot delete it!" });
      const user = await db.getUser(id);
      if (!user) return res.status(404).json({ message: `no user with id=${id}` });
      await db.deleteUser(id);
      res.status(200).json({ message: `user with id=${id} deleted!` });
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  },

  updateOneUser: async (req, res) => {
    const { id } = req.params;
    const { username, password } = req.body;
    if (!username && !password) return res.status(400).json({ message: "username or password should be provided" });
    try {
      if (req.user.id != id) return res.status(403).json({ message: "This user doesn't belong to you and you cannot update it!" });
      await db.updateUser(id, username, password);
      const user = await db.getUser(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  },

  login: async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await db.findUserByUsername(username);
      console.log(user);
      if (!user) return res.status(404).json({ message: "username or password is incorrect" });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(404).json({ message: "username or password is incorrect" });
      const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET_KEY, { expiresIn: "4h" });
      //   console.log(token);
      res
        .cookie("token", token, { httpOnly: true, maxAge: 4 * 60 * 60 * 1000 })
        .status(200)
        .json(user);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  },

  logout: (req, res) => {
    res.clearCookie("token").status(200).json({ message: "logged out" });
  },
};
