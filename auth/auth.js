const jwt = require("jsonwebtoken");
const db = require("../helpers/userHelpers");

module.exports = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(403).json({ message: "A token is required for authentication" });
  }
  console.log(token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decoded) {
      const user = await db.getUser(decoded.id);
      req.user = user;
    } else {
      res.json({ message: "token expired" });
    }
  } catch (err) {
    console.log(err);
  }

  return next();
};
