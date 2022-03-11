require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

const userRouter = require("./routes/user");
app.use("/api/user", userRouter);

const todoRouter = require("./routes/todo");
app.use("/api/todo", todoRouter);

app.listen(3000, () => {
  console.log("server started");
});
