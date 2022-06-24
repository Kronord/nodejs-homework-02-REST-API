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
    res.status(201).json(
      errorOrResponce("201 Created", {
        user: request,
      })
    );
  } catch (error) {
    next(error);
  }
};

const loginController = async (req, res, next) => {
  try {
    const { email, subscription } = req.body;
    const token = await login(req.body);
    if (token === null) {
      res.status(401).json(
        unauthorizedError("401 Unauthorized", {
          message: "Email or password is wrong",
        })
      );
    }
    res.status(200).json(
      errorOrResponce("200 OK", {
        token,
        user: {
          email,
          subscription,
        },
      })
    );
  } catch (error) {
    next(error);
  }
};

const logoutController = async (req, res, next) => {
  try {
    await logout(req.user._id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const currentUserController = async (req, res, next) => {
  try {
    res.status(200).json(errorOrResponce("200 OK", req.user));
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
