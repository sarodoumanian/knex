const express = require("express");

const app = express();

app.use(express.json());

const userRouter = require("./routes/user");
app.use("/api", userRouter);

app.listen(3000, () => {
  console.log("server started");
});
