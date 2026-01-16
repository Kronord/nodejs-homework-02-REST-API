const {
  registration,
  login,
  logout,
  updateSubscription,
} = require("../services/authServices");
const { errorOrResponce, unauthorizedError, createError } = require("../error");

const registrationController = async (req, res, next) => {
  try {
    const request = await registration(req.body);
    if (request === null) {
      res.status(409).json(
        errorOrResponce("409 Conflict", {
          message: "Email in use",
        })
      );
    }
    const {payload, token} = request;
    res.status(201).json(
      errorOrResponce("201 Created", {
        user: payload,
        token,
      })
    );
  } catch (error) {
    next(error);
  }
};

const loginController = async (req, res, next) => {
  try {
    const { token, payload } = await login(req.body);
    if (token === null) {
      return res.status(401).json(
        unauthorizedError("401 Unauthorized", {
          message: "Email or password is wrong",
        })
      );
    }
    // if (token === 'notVerify') {
    //   return res
    //     .status(401)
    //     .json(createError("400", "You have not verified your email"));
    // }
    res.status(200).json(
      errorOrResponce("200 OK", {
        token,
        user: payload
      })
    );
  } catch (error) {
    next(error);
  }
};

const logoutController = async (req, res, next) => {
  const { _id } = req.body;
  try {
    await logout(_id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const currentUserController = async (req, res, next) => {
  try {
    const { email, name, avatarURL, subscription } = req.user;
    res.status(200).json(errorOrResponce("200 OK", { email, name, avatarURL, subscription }));
  } catch (error) {
    next(error);
  }
};

const updateSubscriptionController = async (req, res, next) => {
  try {
    console.log(req.user);
    const { _id } = req.user;
    const updateUser = await updateSubscription(_id, req.body);
    if (!updateUser) {
      throw createError(404, "Not found");
    }
    res.json(updateUser);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registrationController,
  loginController,
  logoutController,
  currentUserController,
  updateSubscriptionController,
};
