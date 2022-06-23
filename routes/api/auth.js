const express = require("express");
const { validateRequest } = require("../../Middlewares/validateRequest");
const { schema, updateSchema } = require("../../Validation/usersValidation");
const authMiddleware = require("../../Middlewares/authMiddleware");
const {
  registrationController,
  loginController,
  logoutController,
  currentUserController,
  updateSubscriptionController,
} = require("../../Controllers/authController");
const router = express.Router();

router.post("/users/signup", validateRequest(schema), registrationController);
router.post("/users/login", validateRequest(schema), loginController);
router.get("/users/logout", authMiddleware, logoutController);
router.get("/users/current", authMiddleware, currentUserController);
router.patch("/users", authMiddleware, validateRequest(updateSchema), updateSubscriptionController);

module.exports = router;
