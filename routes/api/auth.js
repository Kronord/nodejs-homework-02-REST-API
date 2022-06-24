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

router.post("/signup", validateRequest(schema), registrationController);
router.post("/login", validateRequest(schema), loginController);
router.get("/logout", authMiddleware, logoutController);
router.get("/current", authMiddleware, currentUserController);
router.patch("/", authMiddleware, validateRequest(updateSchema), updateSubscriptionController);

module.exports = router;
