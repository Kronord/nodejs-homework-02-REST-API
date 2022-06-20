const { authenticateUser } = require("../services/authServices");
const { errorOrResponce } = require("../error");

const authMiddleware = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer" || !token) {
    console.log(bearer, token);
    res.status(401).json(
      errorOrResponce("401 Unauthorized", {
        message: "Not authorized",
      })
    );
  }

  const user = await authenticateUser(token);
  if (!user) {
    res.status(401).json(
      errorOrResponce("401 Unauthorized", {
        message: "Not authorized",
      })
    );
  }
  req.user = user;
  next();
};

module.exports = authMiddleware;
