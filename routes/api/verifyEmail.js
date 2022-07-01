const express = require("express");
const router = express.Router();
const { schema } = require('../../Validation/mailValidation');
const { validateRequest } = require("../../Middlewares/validateRequest");
const {
  mailController,
  resendingMailController,
} = require("../../Controllers/mailController");

router.get("/verify/:verificationToken", mailController);
router.post("/verify", validateRequest(schema), resendingMailController);

module.exports = router;
